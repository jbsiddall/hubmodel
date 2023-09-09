import {join, dirname} from "https://deno.land/std@0.201.0/path/mod.ts";

const [inputReadmePath, outputReadmePath] = Deno.args

const content = await Deno.readTextFile(inputReadmePath)

const replacer = (match: string, fileName: string, offset: number, wholeFile: string, groups: Record<string, string>) => {
    const dir = dirname(inputReadmePath) 
    const normalisedFilePath = join(dir, fileName)
    const content = Deno.readTextFileSync(normalisedFilePath)
    return '\n' + content.replaceAll('```', '\`\`\`')
}

const result = content.replace(/(?<=\`\`\`\w*):(?<filename>.*)/, replacer)
Deno.writeTextFileSync(outputReadmePath, result)