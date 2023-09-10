import { dirname, join } from "https://deno.land/std@0.201.0/path/mod.ts";

const [inputReadmePath, outputReadmePath] = Deno.args;

const content = await Deno.readTextFile(inputReadmePath);

const replacer = (
  match: string,
  fileName: string,
  offset: number,
  wholeFile: string,
  groups: Record<string, string>,
) => {
  const dir = dirname(inputReadmePath);
  const normalisedFilePath = join(dir, fileName);
  const contentLines = Deno.readTextFileSync(normalisedFilePath).split("\n");
  const index = contentLines.indexOf("// doc-example");
  if (index == -1) {
    throw new Error(`missing '// doc-example' line in file ${normalisedFilePath}`);
  }
  const linesForExample = contentLines.slice(index + 1).join("\n");
  return "\n" + linesForExample.replaceAll("```", "\`\`\`");
};

const result = content.replace(/(?<=\`\`\`\w*):(?<filename>.*)/, replacer);
Deno.writeTextFileSync(outputReadmePath, result);
