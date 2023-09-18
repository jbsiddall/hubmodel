import { createHubspotClient } from "../lib/index.ts";
import { afterAll, beforeAll, describe, it } from "https://deno.land/std@0.201.0/testing/bdd.ts";
import { axios } from "./deps.ts";
import { assertSnapshot } from "https://deno.land/std@0.201.0/testing/snapshot.ts";
import { getConfig } from "../env.ts";
import {
  create as createAxiosSnapshot,
  flush as flushAxiosSnapshot,
  initCache as initAxiosSnapshot,
} from "./axios_snapshot.ts";
import { CollectionInstance } from "./common.ts";

const cachedAxios = createAxiosSnapshot(axios);
beforeAll(() => initAxiosSnapshot());
afterAll(() => flushAxiosSnapshot());

const accessToken = Deno.args.includes("--update") ? getConfig().HUBSPOT_TOKEN : "faketoken";

const client = createHubspotClient({ axios: cachedAxios, accessToken });

describe("FindMany Select - type checks", () => {
  // checks types for a bug where we could add properties to the select object that didn't exist
  async function _typeCheckOnlySelectClause() {
    await client.contacts.findMany({
      select: {
        hs_all_accessible_team_ids: true,
        address: true,
        // @ts-expect-error only known properties allowed to be selected
        fake_property_that_doesnt_exist: true,
      },
    });
  }
});

const sanitiseContactsForSnapshot = (contacts: CollectionInstance<"contacts", any>[]) => {
  return contacts.map((c) => {
    return { ...c, updatedAt: undefined };
  });
};

describe("FindMany Select just email", () => {
  it(async function response(ctx) {
    const contacts = await client.contacts.findMany({ select: { email: true } });
    assertSnapshot(ctx, sanitiseContactsForSnapshot(contacts));
  });
});

describe("FindMany Where email is 'fakeemail'", () => {
  it(async (ctx) => {
    assertSnapshot(
      ctx,
      sanitiseContactsForSnapshot(
        await client.contacts.findMany({ where: { email: { equals: "fakeemail" } } }),
      ),
    );

    /** String Property */
    // @ts-expect-error error
    await client.contacts.findMany({ where: { email: { equals: 123 } } });

    assertSnapshot(
      ctx,
      sanitiseContactsForSnapshot(
        await client.contacts.findMany({ where: { email: { equals: null } } }),
      ),
    );

    // @ts-expect-error error
    await client.contacts.findMany({ where: { email: { equals: new Date() } } });

    assertSnapshot(
      ctx,
      sanitiseContactsForSnapshot(
        await client.contacts.findMany({ where: { followercount: { equals: 123 } } }),
      ),
    );

    // @ts-expect-error error
    await client.contacts.findMany({ where: { followercount: { equals: "123" } } });

    assertSnapshot(
      ctx,
      sanitiseContactsForSnapshot(
        await client.contacts.findMany({ where: { followercount: { equals: null } } }),
      ),
    );

    assertSnapshot(
      ctx,
      sanitiseContactsForSnapshot(
        await client.contacts.findMany({ where: { email: { not: "fakeemail" } } }),
      ),
    );

    // @ts-expect-error error
    const result = await client.contacts.findMany({ where: { email: { not: 123 } } });

    assertSnapshot(
      ctx,
      sanitiseContactsForSnapshot(
        await client.contacts.findMany({ where: { email: { not: null } } }),
      ),
    );
  });
});
