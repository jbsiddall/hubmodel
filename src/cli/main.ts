import outdent from "https://deno.land/x/outdent@v0.8.0/mod.ts";
import { fromFileUrl, join, normalize } from "https://deno.land/std@0.201.0/path/mod.ts";
import { axios, R, z } from "./deps.ts";
import { configureAxios, getObjectTypeProperties, PropertyDefinitionValidator } from "../rest.ts";
import { Project, StructureKind, VariableDeclarationKind, Writers } from "https://deno.land/x/ts_morph@20.0.0/mod.ts";
import { ConfigValidator } from "./config.ts";
import { HubspotFieldType, HubspotFieldTypeValidator } from "../lib/common.ts";
import { parse as parseArgs } from "https://deno.land/std@0.202.0/flags/mod.ts";
import { parse as parseYaml, stringify as stringifyYaml } from "https://deno.land/std@0.202.0/yaml/mod.ts";
import { FIELD_VALIDATORS } from "../lib/where.ts";

const folderToWriteTo = join(
  fromFileUrl(import.meta.url),
  "..",
  "..",
  "generated",
);

const folderToImportFrom = join(
  fromFileUrl(import.meta.url),
  "..",
  "..",
  "lib",
);

const relativePath = (fromPath: string, toPath: string) => {
  const process = (path: string) => normalize(path).split("/").filter((x) => x.trim() !== "");
  const fromPathParts = process(fromPath);
  const toPathParts = process(toPath);

  const mraParts = R.zip(fromPathParts, toPathParts).reduce(
    ({ mra, done }, [a, b]) => {
      if (done || a !== b) {
        return {
          done: true,
          mra,
        };
      }
      return {
        done: false,
        mra: [...mra, a],
      };
    },
    { mra: [] as string[], done: false },
  ).mra;

  const fromPathExtras = fromPathParts.slice(mraParts.length).map((_) => "..");
  return join(...fromPathExtras, ...toPathParts.slice(mraParts.length));
};

const initConfig = async ({ hubspotToken }: { hubspotToken: string }) => {
  await Deno.writeTextFile(
    "hubmodel.yml",
    stringifyYaml(
      {
        environment: "deno",
        hubspotToken,
        collections: ["contacts", "deals"],
      } satisfies z.infer<typeof ConfigValidator>,
    ),
    { createNew: true },
  );
};

const main = async () => {
  const flags = parseArgs(Deno.args, {
    boolean: ["init"],
    string: ["hubspotToken"],

    default: {
      init: false,
    },
  });
  type KnownFlags = keyof { [K in keyof typeof flags as string extends K ? never : K]: true };

  if (flags.init) {
    if (!flags.hubspotToken) {
      console.log(`missing arg --${"hubspotToken" satisfies KnownFlags}`);
      Deno.exit(1);
    }
    await initConfig({ hubspotToken: flags.hubspotToken });
    return;
  }

  const config = ConfigValidator.parse(parseYaml(await Deno.readTextFile("./hubmodel.yml")));
  configureAxios({ axios, accessToken: config.hubspotToken });
  await Deno.mkdir(folderToWriteTo, { recursive: true });

  const relativeLibFolder = relativePath(folderToWriteTo, folderToImportFrom);

  const project = new Project();

  // const commonFile = project.createSourceFile(join(folderToWriteTo, 'common.ts'), undefined, {overwrite: true})

  // switch (config.environment) {
  //   case 'deno':
  //     commonFile.addImportDeclaration({
  //       moduleSpecifier: "https://deno.land/x/zod@v3.22.2/mod.ts",
  //       namedImports: ['z'],
  //     })
  //     commonFile.addExportDeclaration({
  //       moduleSpecifier: "https://deno.land/x/zod@v3.22.2/mod.ts",
  //       namedExports: ['z'],
  //     })
  //     break
  //   case 'node':
  //     commonFile.addImportDeclaration({
  //       moduleSpecifier: "zod",
  //       namedImports: ['z'],
  //     })
  //     commonFile.addExportDeclaration({
  //       moduleSpecifier: "zod",
  //       namedExports: ['z'],
  //     })
  //     break
  // }
  // commonFile.insertStatements(0, [
  //   '// deno-lint-ignore-file',
  //   '// eslint-disable\n',
  // ])

  await Promise.all(
    config.collections.map(async (objectType) => {
      const file = project.createSourceFile(join(folderToWriteTo, `$${objectType}.ts`), undefined, { overwrite: true });
      const properties = await getObjectTypeProperties({ axios, objectType });

      file.addImportDeclaration({
        moduleSpecifier: join(relativeLibFolder, "deps.ts"),
        namedImports: ["z"],
      });
      file.addImportDeclaration({
        moduleSpecifier: join(relativeLibFolder, "where.ts"),
        namedImports: [
          { name: "FIELD_VALIDATORS" },
          { name: "createCollectionWhereValidator" },
        ],
      });
      file.addImportDeclaration({
        moduleSpecifier: join(relativeLibFolder, "common.ts"),
        namedImports: [
          { name: "verifyCollection" },
        ],
      });

      file.addVariableStatement({
        declarationKind: VariableDeclarationKind.Const,
        isExported: true,
        declarations: [
          {
            name: "InstanceValidator",
            initializer: (w) => {
              w.writeLine("z.object({");
              w.indent(() => {
                properties.forEach((property) => {
                  const typeExpr = lookupZodTypeV2(property);
                  w.writeLine(`${property.name}: ${typeExpr},`);
                });
              });
              w.writeLine("})");
            },
          },
        ],
      });

      // file.addVariableStatement({
      //   declarationKind: VariableDeclarationKind.Const,
      //   isExported: false,
      //   declarations: [
      //     {
      //       name: "WhereSimpleFieldBase",
      //       initializer: (w) => {
      //         w.write("verifyCollectionSimpleFieldBase(z.object(");
      //         const propertiesAsObject = {} as Record<string, string>
      //         properties.forEach(({name, type}) => {
      //           propertiesAsObject[name] = `FIELD_VALIDATORS.${type}`
      //         })
      //         Writers.object(propertiesAsObject)(w)
      //         w.writeLine("))");
      //       },
      //     },
      //   ],
      // });
      file.addVariableStatement({
        declarationKind: VariableDeclarationKind.Const,
        isExported: false,
        declarations: [
          {
            name: "WhereArgValidator",
            initializer: (w) => {
              w.write("createCollectionWhereValidator(z.object(");
              const propertiesAsObject = {} as Record<string, string>;
              properties.forEach(({ name, type }) => {
                const parsedTypeResult = HubspotFieldTypeValidator.safeParse(type);
                const usableType = parsedTypeResult.success
                  ? parsedTypeResult.data
                  : "unknown" satisfies keyof typeof FIELD_VALIDATORS;
                propertiesAsObject[name] = `FIELD_VALIDATORS.${usableType}`;
              });
              Writers.object(propertiesAsObject)(w);
              w.writeLine(").partial())");
            },
          },
        ],
      });
      file.addVariableStatement({
        declarationKind: VariableDeclarationKind.Const,
        isExported: false,
        declarations: [
          {
            name: "SelectArgValidator",
            initializer: (w) => {
              const propertyLiterals = properties.map((p) => `z.literal("${p.name}")`).join(", ");
              w.writeLine("z.record(");
              w.writeLine(`z.union([${propertyLiterals}]),`);
              w.writeLine(`z.literal(true),`);
              w.writeLine(")");
            },
          },
        ],
      });
      file.addVariableStatement({
        isExported: true,
        declarationKind: VariableDeclarationKind.Const,
        declarations: [
          {
            name: "definition",
            initializer: (w) => {
              w.write("verifyCollection(");
              Writers.object({
                SelectArgValidator: "SelectArgValidator",
                WhereArgValidator: "WhereArgValidator",
                InstanceValidator: "InstanceValidator",
              })(w);
              w.write(")");
            },
          },
        ],
      });
    }),
  );

  const file = project.createSourceFile(join(folderToWriteTo, `main.ts`), undefined, { overwrite: true });

  file.addImportDeclarations(config.collections.map((name) => ({
    moduleSpecifier: `./$${name}.ts`,
    namedImports: [{ name: "definition", alias: `collection_${name}` }],
  })));

  // export const createHubspotClient = (
  //   config: CreateHubspotClientConfig,
  // ): EnrichedHubspotClient => {
  //   configureAxios(config);
  //   return R.mapObjIndexed(
  //     (_, collectionName) => createCollectionClient({ collectionName, client: config.axios }),
  //     __META__.collectionProperties,
  //   ) as any;
  // };

  file.addImportDeclaration({
    moduleSpecifier: join(relativeLibFolder, "deps.ts"),
    namedImports: [
      { name: "z" },
    ],
  });

  file.addImportDeclaration({
    moduleSpecifier: join(relativeLibFolder, "client.ts"),
    namedImports: [
      { name: "HubModelClientConfig", isTypeOnly: true },
      { name: "HubModelClient", isTypeOnly: true, alias: "HubModelClientInterface" },
      { name: "createHubModelClient", alias: "_createHubModelClient" },
    ],
  });
  file.addExportDeclaration({
    moduleSpecifier: join(relativeLibFolder, "client.ts"),
    namedExports: [
      { name: "HubModelClientConfig", isTypeOnly: true },
    ],
  });

  file.addImportDeclaration({
    moduleSpecifier: join(relativeLibFolder, "common.ts"),
    namedImports: [
      { name: "GeneratedHubspotSchema", isTypeOnly: true },
      { name: "verifySchema" },
      { name: "CollectionInstance" },
    ],
  });

  file.addStatements([
    {
      kind: StructureKind.VariableStatement,
      declarationKind: VariableDeclarationKind.Const,
      declarations: [
        {
          name: "schema",
          initializer: (w) => {
            w.write("verifySchema(");
            Writers.object({
              collections: Writers.object(
                Object.fromEntries(config.collections.map((name) => [name, `collection_${name}`] as const)),
              ),
            })(w);
            w.write(")");
          },
        },
      ],
    },
  ]);

  file.addInterface({
    name: "HubModelClient",
    isExported: true,
    extends: [`HubModelClientInterface<typeof schema>`],
  });

  config.collections.forEach((colName) => {
    file.addInterface({
      name: `${colName + "Instance"}`,
      isExported: true,
      typeParameters: [{
        name: "Properties",
        constraint: `keyof z.infer<(typeof schema)["collections"]["${colName}"]["InstanceValidator"]>`,
      }],
      extends: [`CollectionInstance<(typeof schema)["collections"]["${colName}"], Properties>`],
    });
  });

  file.addFunction({
    name: "createHubModelClient",
    isExported: true,
    parameters: [
      { name: "config", type: "HubModelClientConfig" },
    ],
    returnType: "HubModelClient",
    statements: outdent`
      return _createHubModelClient({schema, config})
    `,
  });

  // file.addClass({
  //   name: 'HubModelClient',
  //   isExported: true,
  //   getAccessors: config.collections.map(name => ({
  //     name,
  //     statements: outdent`
  //       return "foobar"
  //     `
  //   }))
  // })

  //   {
  //     kind: StructureKind.,
  //     declarationKind: VariableDeclarationKind.Const,
  //     isExported: true,
  //     declarations: [
  //       {
  //         name: 'HubModelClient',
  //         initializer: w => {
  //           w.write('(')
  //           Writers.object(Object.fromEntries(config.collections.map(name => [name, `collection_${name}`] as const)))(w)
  //           w.write(') as const')
  //         }
  //       },
  //     ]
  //   },
  // ])

  await project.save();
  // eslint-disable-next-line no-console
  console.log(`Autogenerated hubmodel client :)`);
};

const EnumerationValidator = z.object({
  options: z.array(
    z.object({
      label: z.string(),
      value: z.string(),
    }),
  ),
});

const ZodStringExprV2 = `z.string().nullable()`;
const ZodDateExprV2 = `
  z.string()
    .nullable()
    .transform(x => {
      if (x) {
        return new Date(x)
      }
      return null
    })
`;

const primitiveHubspotTypesToZodV2: Record<Exclude<HubspotFieldType, "enumeration">, string> = {
  string: ZodStringExprV2,
  datetime: ZodDateExprV2,
  date: ZodDateExprV2,
  phone_number: ZodStringExprV2,
  bool: `z.boolean()`,
  number: `z.number()`,
};

const lookupZodTypeV2 = (
  property: z.infer<typeof PropertyDefinitionValidator>,
): string => {
  const tsType = (primitiveHubspotTypesToZodV2 as Record<string, string>)[property.type];

  if (tsType) {
    return tsType;
  }

  if (property.type === "enumeration") {
    const { options } = EnumerationValidator.parse(property);
    if (options.length === 0) {
      return ZodStringExprV2;
    }

    return `z.enum([
      ${options.map((p) => `"${p.value}"`).join(",")}
    ])`;
  }

  return `z.unknown()`;
};

main();
