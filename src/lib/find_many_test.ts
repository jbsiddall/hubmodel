import { assertEquals } from "https://deno.land/std@0.201.0/assert/mod.ts";
import { assertSpyCall, assertSpyCalls, returnsNext, spy, stub } from "https://deno.land/std@0.201.0/testing/mock.ts";
import { createHubspotClient, createHubspotClientForTesting } from "../lib/index.ts";
import { afterEach, beforeEach, describe, it } from "https://deno.land/std@0.201.0/testing/bdd.ts";
import { axios, R } from "./deps.ts";
import MockAdapter from "npm:axios-mock-adapter";
import { assertSnapshot } from "https://deno.land/std@0.201.0/testing/snapshot.ts";

// const assertSnapshotBetter = (ctx: Deno.TestContext, value: unknown, tag?: string) => {
//   assertSnapshot(ctx, value, {name:})
// }

const mockedAxios = new MockAdapter(axios);

// const mockedAxios = stub(axios, 'post')

const client = createHubspotClient({ accessToken: "testtoken" });

afterEach(() => {
  mockedAxios.reset();
});

describe("FindMany Select - type checks", () => {
  // checks types for a bug where we could add properties to the select object that didn't exist
  async function _typeCheckOnlySelectClause() {
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
});

describe("FindManySelect", () => {
  beforeEach(() => {
    mockedAxios.onPost().replyOnce(200, {
      results: [
        {
          "id": "123",
          "properties": {
            "email": "fakeemail",
            "unwanted": "unwanted",
          },
          "createdAt": "2023-09-15T23:36:11.779Z",
          "updatedAt": "2023-09-15T23:36:11.779Z",
          "archived": false,
        },
      ],
    });
  });

  const f = () => client.contacts.findMany({ select: { email: true } });

  it(async function history(ctx) {
    await f();
    const request = mockedAxios.history.post[0];

    assertSnapshot(
      ctx,
      R.pick(
        ["baseURL", "url", "data", "headers"],
        request,
      ),
    );
  });

  it(async function response(ctx) {
    const contacts = await f();
    const snapshotContacts = contacts.map((c) => {
      return { ...c, updatedAt: undefined };
    });
    assertSnapshot(ctx, snapshotContacts);
  });
});

describe("FindMany Where", () => {
  async function _typeCheckOnlyWhereClause() {
    await client.contacts.findMany({ where: { email: { equals: "fakeemail" } } });

    /** String Property */
    // @ts-expect-error error
    await client.contacts.findMany({ where: { email: { equals: 123 } } });

    await client.contacts.findMany({ where: { email: { equals: null } } });

    // @ts-expect-error error
    await client.contacts.findMany({ where: { email: { equals: new Date() } } });

    /** number Property */
    await client.contacts.findMany({ where: { followercount: { equals: 123 } } });

    // @ts-expect-error error
    await client.contacts.findMany({ where: { followercount: { equals: "123" } } });

    await client.contacts.findMany({ where: { followercount: { equals: null } } });

    await client.contacts.findMany({ where: { email: { not: "fakeemail" } } });
    // @ts-expect-error error
    await client.contacts.findMany({ where: { email: { not: 123 } } });
    await client.contacts.findMany({ where: { email: { not: null } } });
  }
});
