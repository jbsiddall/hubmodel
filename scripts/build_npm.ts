import { build, emptyDir } from "https://deno.land/x/dnt/mod.ts";
import { copySync } from "https://deno.land/std@0.201.0/fs/copy.ts";



await emptyDir("./npm");

await build({
  entryPoints: [
    { kind: "bin", name: "hubmodel", path: "./src/cli/main.ts" },
  ],
  outDir: "./npm",
  shims: {
    deno: true,
  },
  test: false,
  package: {
    name: "hubmodel",
    version: Deno.readTextFileSync('./VERSION').trim(),
    description: "Your package.",
    license: "MIT",
    repository: {
      type: "git",
      url: "git+https://github.com/jbsiddall/hubspot-orm.git",
    },
    bugs: {
      url: "https://github.com/jbsiddall/hubspot-orm.git/issues",
    },
  },
  postBuild() {
    // steps to run after building and before running the tests
    Deno.copyFileSync("LICENSE", "npm/LICENSE");
    copySync('./docs', 'npm/docs')
  },
});
