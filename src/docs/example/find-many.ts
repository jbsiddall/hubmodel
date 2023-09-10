import { client } from "./setup.ts";
// doc-example

// retreive all contacts and all their properties
await client.contacts.findMany({});

// retrieve all contacts but only include the 3 properties
await client.contacts.findMany({
  select: {
    address: true,
    hs_createdate: true,
    email: true,
    firstname: true,
  },
});
