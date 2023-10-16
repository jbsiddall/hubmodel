import outdent from "http://deno.land/x/outdent/mod.ts";
import { fromFileUrl, join, normalize } from "https://deno.land/std@0.201.0/path/mod.ts";
import { axios, R, z } from "./deps.ts";
import { configureAxios, getObjectTypeProperties, PropertyDefinitionValidator } from "../rest.ts";
import { Project, StructureKind, VariableDeclarationKind, Writers } from "https://deno.land/x/ts_morph/mod.ts";
import { ConfigValidator } from "./config.ts";
import { parse as parseYaml } from "https://deno.land/std@0.202.0/yaml/mod.ts";

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

const main = async () => {
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
      file.addVariableStatement({
        declarationKind: VariableDeclarationKind.Const,
        isExported: false,
        declarations: [
          {
            name: "SelectArgValidator",
            initializer: (w) => {
              w.write("z.object(");
              Writers.object(
                properties.reduce(
                  (r, p) => ({ ...r, [p.name]: "z.literal(true).optional()" as const }),
                  {} as Record<string, string>,
                ),
              )(w);
              w.writeLine(").strict()");
            },
          },
        ],
      });
      file.addVariableStatement({
        declarationKind: VariableDeclarationKind.Const,
        isExported: false,
        declarations: [
          {
            name: "WhereArgValidator",
            initializer: (w) => {
              w.write("z.object(");
              Writers.object(
                properties.reduce(
                  (r, p) => ({ ...r, [p.name]: "z.literal(true).optional()" as const }),
                  {} as Record<string, string>,
                ),
              )(w);
              w.writeLine(").strict()");
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
              w.write("(");
              Writers.object({
                SelectArgValidator: "SelectArgValidator",
                WhereArgValidator: "WhereArgValidator",
                InstanceValidator: "InstanceValidator",
              })(w);
              w.write(") as const");
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

const primitiveHubspotTypesToZodV2: Record<string, string> = {
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
  const tsType = primitiveHubspotTypesToZodV2[property.type];

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
