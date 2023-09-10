import { fromFileUrl, join } from "https://deno.land/std@0.201.0/path/mod.ts";
import { R, z } from "./deps.ts";
import { Expression, expression, serialize, Statement } from "./code-generator.ts";
import { createHubspotAxios, getObjectTypeProperties, PropertyDefinitionValidator } from "../rest.ts";
import { getConfig } from "../env.ts";

const fileToWriteTo = join(
  fromFileUrl(import.meta.url),
  "..",
  "..",
  "generated.ts",
);

const debugPath = join(
  "./",
  "debug.json",
);

const hubspotObjectTypesToDownload = ["tickets", "contacts", "tasks"];

export const axios = createHubspotAxios({
  accessToken: getConfig().HUBSPOT_TOKEN,
});

const main = async () => {
  const statements: Statement[] = [
    {
      type: "import",
      importNames: ["z"],
      module: "https://deno.land/x/zod@v3.22.2/mod.ts",
    },
  ];

  const debugOutput: Record<string, unknown> = {};

  await Promise.all(
    hubspotObjectTypesToDownload.map(async (objectType) => {
      const properties = await getObjectTypeProperties({ axios, objectType });

      debugOutput[objectType] = properties;

      const propertiesExpr = properties.reduce(
        (results, p) => {
          const typeExpr = lookupZodType(p);
          return { ...results, [p.name]: typeExpr };
        },
        {} as Record<string, Expression>,
      );

      statements.push({
        type: "variable-declaration",
        name: objectType,
        expression: expression().var("z").dot("object").call(
          expression().object(propertiesExpr),
        ).finishExpr(),
      });

      statements.push({
        type: "variable-declaration",
        name: objectType + "Definition",
        expression: expression().json(properties),
      });
    }),
  );

  statements.push({
    type: "variable-declaration",
    name: "__META__",
    expression: expression().object({
      collectionProperties: expression().object(
        R.fromPairs(
          hubspotObjectTypesToDownload.map((name) => [name, expression().var(name).finishExpr()] as const),
        ),
      ),
      definition: expression().object(
        R.fromPairs(
          hubspotObjectTypesToDownload.map((name) =>
            [name, expression().var(name + "Definition").finishExpr()] as const
          ),
        ),
      ),
    }),
    export: true,
  });

  const expr = await serialize(statements);

  // const output = allTsTypes.join('\n\n');
  const output = expr;
  await Deno.writeTextFile(fileToWriteTo, output, { create: true });
  await Deno.writeTextFile(debugPath, JSON.stringify(debugOutput, null, 4), {
    create: true,
  });
  // eslint-disable-next-line no-console
  console.log(`Autogenerated file ${fileToWriteTo}`);
};

const EnumerationValidator = z.object({
  options: z.array(
    z.object({
      label: z.string(),
      value: z.string(),
    }),
  ),
});

const zodStringExpr = expression().var("z").dot("string").call().dot("nullable")
  .call().finishExpr();
const zodDateExpr = expression().var("z").dot("string").call().dot("nullable")
  .call().dot("transform").call(
    expression().arrow(["x"], () => [
      {
        type: "if",
        guard: expression().var("x").finishExpr(),
        body: [
          {
            type: "return",
            value: expression().new().var("Date").finishExpr().call(
              expression().var("x").finishExpr(),
            ).finishExpr(),
          },
        ],
      },
      { type: "return", value: expression().null() },
    ]),
  ).finishExpr();

const primitiveHubspotTypesToZod: Record<string, Expression> = {
  string: zodStringExpr,
  datetime: zodDateExpr, // formatted strings as YYYY-MM-DD
  date: zodDateExpr, // formatted strings as YYYY-MM-DD
  phone_number: zodStringExpr,
  bool: expression().var("z").dot("boolean").call().finishExpr(),
  number: expression().var("z").dot("number").call().finishExpr(),
};

const lookupZodType = (
  property: z.infer<typeof PropertyDefinitionValidator>,
): Expression => {
  const tsType = primitiveHubspotTypesToZod[property.type];

  if (tsType) {
    return tsType;
  }

  if (property.type === "enumeration") {
    const { options } = EnumerationValidator.parse(property);
    if (options.length === 0) {
      return zodStringExpr;
    }
    return expression().var("z").dot("enum").call(
      expression().array(options.map((p) => expression().string(p.value))),
    ).finishExpr();
  }

  return expression().var("z").dot("unknown").call().finishExpr();
};

main();
