import { command, positional, run, string } from "cmd-ts";

const cmd = command({
  name: "hubspot-orm",
  args: {
    file: positional({ type: string, displayName: "myvalue" }),
  },
  handler: ({ file }) => {
    console.log("yay run", file);
  },
});

run(cmd, process.argv.slice(2));
