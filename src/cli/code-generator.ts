import dedent from "npm:dedent";
import { R } from "./deps.ts";
import { format } from "npm:prettier";

export type FunctionBodyStatements =
  | VariableDeclaration
  | ReturnStatement
  | IfStatement;

export type Statement = FunctionBodyStatements | ImportStatement;

interface IfStatement {
  type: "if";
  guard: Expression;
  body: Statement[];
}

interface ReturnStatement {
  type: "return";
  value: Expression;
}

interface ImportStatement {
  type: "import";
  module: string;
  importNames: Record<string, string> | string[];
}

interface VariableDeclaration {
  type: "variable-declaration";
  name: string;
  expression: Expression;
  export?: boolean;
}

export type Expression =
  | VarExpr
  | LiteralExpr
  | CallExpr
  | AttrAccessExpr
  | ArrowExpr
  | NewExpr
  | JsonExpr;

interface VarExpr {
  type: "var";
  name: string;
}

interface JsonExpr {
  type: "json";
  value: object;
  const: boolean;
}

type LiteralExpr = NullLiteral | StringLiteral | ObjectLiteral | ArrayLiteral;

interface NullLiteral {
  type: "null-literal";
}

interface StringLiteral {
  type: "string-literal";
  value: string;
}

interface ObjectLiteral {
  type: "object-literal";
  value: Record<string, Expression>;
}

interface ArrayLiteral {
  type: "array-literal";
  value: Expression[];
}

interface CallExpr {
  type: "call";
  funcExpression: Expression;
  arguments: Expression[];
}

interface AttrAccessExpr {
  type: "attribute-access";
  objExpression: Expression;
  attributeName: Expression;
}

interface ArrowExpr {
  type: "arrow";
  parameters: { name: string }[];
  body: FunctionBodyStatements[];
}

interface NewExpr {
  type: "new";
  obj: Expression;
}

export const serialize = async (ast: Statement[]) => {
  const result = ast.map(serializeStatement).join("; \n");
  return format(result, { filepath: "data.ts" });
};

const serializeStatement = (s: Statement): string => {
  switch (s.type) {
    case "variable-declaration": {
      return dedent`
                ${s.export ? "export" : ""} const ${s.name} = ${serializeExpr(s.expression)}
            `;
    }
    case "import": {
      const namesMap = Array.isArray(s.importNames)
        ? s.importNames.join(", ")
        : Object.entries(s.importNames).map(([K, V]) => `${K} as ${V}`).join(
          ", ",
        );

      return dedent`
                import {${namesMap}} from "${s.module}"
            `;
    }
    case "return": {
      return `return ${serializeExpr(s.value)}`;
    }
    case "if": {
      return `
                if (${serializeExpr(s.guard)}) {
                    ${s.body.map(serializeStatement).join(";\n")}
                }
            `;
    }
    default: {
      return assertUnreachable(s);
    }
  }
};

const serializeExpr = <E extends Expression>(expr: E): string => {
  switch (expr.type) {
    case "var":
      return expr.name;
    case "null-literal":
      return "null";
    case "string-literal":
      return `"${expr.value}"`;
    case "object-literal": {
      const flattened = R.map((v) => serializeExpr(v), expr.value);
      const inner = R.toPairs(flattened).map(([K, V]) => `${K}: ${V}`).join(
        ", ",
      );
      return `{ ${inner} }`;
    }
    case "array-literal": {
      const flattened = R.map((v) => serializeExpr(v), expr.value);
      const inner = flattened.join(", ");
      return `[ ${inner} ]`;
    }
    case "attribute-access": {
      const objString = serializeExpr(expr.objExpression);

      if (
        expr.attributeName.type === "string-literal" &&
        expr.attributeName.value.match(/^[a-zA-Z0-9]+$/)
      ) {
        return `${objString}.${expr.attributeName.value}`;
      }
      const attrNameString = serializeExpr(expr.attributeName);
      return `${objString}[${attrNameString}]`;
    }
    case "call": {
      const args = expr.arguments.map(serializeExpr).join(", ");
      return `${serializeExpr(expr.funcExpression)}(${args})`;
    }
    case "arrow": {
      const paramsString = expr.parameters.map((p) => p.name).join(", ");
      const bodyString = expr.body.map(serializeStatement).join("; ");
      return `(${paramsString}) => { ${bodyString} }`;
    }
    case "new":
      return `new ${serializeExpr(expr.obj)}`;
    case "json":
      return JSON.stringify(expr.value) + (expr.const ? "as const" : "");
    default:
      return assertUnreachable(expr);
  }
};

export const expression = () => expressionBuilder((x) => x);

const expressionBuilder = <T>(restore: (expr: Expression) => T) => {
  return {
    var(name: string) {
      return partialExpressionBuilder<T>({ type: "var", name }, restore);
    },
    new() {
      return expressionBuilder((newValue) => {
        return partialExpressionBuilder({
          type: "new",
          obj: newValue,
        }, restore);
      });
    },
    object(value: Record<string, Expression>) {
      return restore({ type: "object-literal", value });
    },
    array(value: Expression[]) {
      return restore({ type: "array-literal", value });
    },
    arrow(params: string[], closure: () => FunctionBodyStatements[]) {
      return restore({
        type: "arrow",
        parameters: params.map((p) => ({ name: p })),
        body: closure(),
      });
    },
    string(value: string) {
      return restore({ type: "string-literal", value: value });
    },
    null() {
      return restore({ type: "null-literal" });
    },
    json(obj: object) {
      return restore({
        type: "json",
        const: true,
        value: JSON.parse(JSON.stringify(obj)),
      });
    },
  };
};

const partialExpressionBuilder = <T>(
  expr: Expression,
  restore: (e: Expression) => T,
) => {
  return {
    finishExpr() {
      return restore(expr);
    },
    dot(attributeName: string) {
      return partialExpressionBuilder({
        type: "attribute-access",
        objExpression: expr,
        attributeName: {
          type: "string-literal",
          value: attributeName,
        },
      }, restore);
    },
    call(...args: Expression[]) {
      return partialExpressionBuilder({
        type: "call",
        funcExpression: expr,
        arguments: args,
      }, restore);
    },
  };
};

function assertUnreachable(x: never): never {
  throw new Error("Didn't expect to get here");
}
