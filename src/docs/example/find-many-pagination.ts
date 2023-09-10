import { client } from "./setup.ts";
// doc-example
// retrieve first 10 contacts. pagination when combined with `skip`
await client.contacts.findMany({ take: 10 });

// retrieve second page of contacts where each page is of size 10.
await client.contacts.findMany({ take: 10, skip: 10 });
