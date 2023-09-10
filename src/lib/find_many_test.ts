import { createHubspotClient } from "../lib/index.ts";

// checks types for a bug where we could add properties to the select object that didn't exist
async function _typeCheckOnly() {
  const client = createHubspotClient({ accessToken: "FAKETOKEN" });

  // @ts-expect-error only known properties allowed to be selected
  await client.contacts.findMany({ select: { fake_property_that_doesnt_exist: true } });

  // @ts-expect-error only known properties allowed to be selected
  await client.contacts.findMany({ select: { address: true, fake_property_that_doesnt_exist: true } });

  await client.contacts.findMany({
    select: {
      hs_all_accessible_team_ids: true,
      address: true,
      // @ts-expect-error only known properties allowed to be selected
      fake_property_that_doesnt_exist: true,
    },
  });
}
