import { contactsInstance, createHubModelClient } from "../generated/main.ts";
import { afterAll, beforeAll, describe, it } from "https://deno.land/std@0.201.0/testing/bdd.ts";
import { axios as realAxios } from "./deps.ts";
import { assertSnapshot } from "https://deno.land/std@0.201.0/testing/snapshot.ts";
import { getConfig } from "../env.ts";
import { create as createAxiosSnapshot } from "./axios_snapshot.ts";
import { CollectionInstance } from "./common.ts";
import { assertEquals, assertRejects } from "https://deno.land/std@0.201.0/assert/mod.ts";

const { assertSameNetworkRequests, axios } = createAxiosSnapshot({ axios: realAxios });

const client = createHubModelClient({ axios, accessToken: Deno.env.get("HUBSPOT_TOKEN")! });

describe("Select Clause", () => {
  it.skip("runtime error when field selected that doesnt exist", async (t) => {
    await assertRejects(() =>
      client.contacts.findMany({
        select: {
          hs_all_accessible_team_ids: true,
          address: true,
          // // @ts-expect-error only known properties allowed to be selected
          fake_property_that_doesnt_exist: true,
        },
      })
    );
  });

  it("selecting email only returns email field", async (ctx) => {
    const contacts = await assertSameNetworkRequests({ctx, expectedRequestHashes: ['aFN3dGV3ZFVNZFdFNy9pZnVmZzFaajlKelg4PQ==']}, () => client.contacts.findMany({
      select: { email: true },
    }))
    assertSnapshot(ctx, sanitiseContactsForSnapshot(contacts));
  });
});

describe("Where Clause", () => {
  it('email equals "fakeemail"', async (ctx) => {
    const contacts = sanitiseContactsForSnapshot(
      await client.contacts.findMany({
        where: { email: { equals: "fakeemail" } },
      }),
    );
    assertSnapshot(ctx, contacts);
    assertEquals(contacts, []);
  });

  it("email equals 1 specific contact email", async (ctx) => {
    const contacts = sanitiseContactsForSnapshot(
      await client.contacts.findMany({
        select: { email: true },
        where: { email: { equals: "bh@hubspot.com" } },
      }),
    );
    assertSnapshot(ctx, contacts);
    assertEquals(contacts.length, 1);
    assertEquals(contacts[0].properties.email, "bh@hubspot.com");
  });
  it("email NOT equal to 1 specific contact email", async (ctx) => {
    const contacts = sanitiseContactsForSnapshot(
      await client.contacts.findMany({
        select: { email: true },
        where: { email: { not: "bh@hubspot.com" } },
      }),
    );
    assertSnapshot(ctx, contacts);
    assertEquals(contacts.length, 1);
    assertEquals(contacts[0].properties.email, "emailmaria@hubspot.com");
  });

  it.skip("runtime error when number passed to equals field expecting string", async () => {
    await assertRejects(() =>
      // @ts-expect-error error
      client.contacts.findMany({ where: { email: { equals: 123 } } })
    );
  });

  it.skip("runtime error when date passed to equals field expecting string", async () => {
    await assertRejects(() =>
      // @ts-expect-error error
      client.contacts.findMany({ where: { email: { equals: new Date() } } })
    );
  });

  it.skip("runtime error when string passed to equals field expecting number", async () => {
    await assertRejects(() =>
      client.contacts.findMany({
        // @ts-expect-error error
        where: { followercount: { equals: "123" } },
      })
    );
  });

  it.skip("runtime error when string passed to equals field expecting number", async () => {
    const result = await assertRejects(() =>
      client.contacts.findMany({
        // @ts-expect-error error
        where: { email: { not: 123 } },
      })
    );
  });

  it("'equal' and 'not' of same value always return empty", async () => {
    const contacts = await client.contacts.findMany({
      where: { email: { equals: "emailmaria@hubspot.com", not: "emailmaria@hubspot.com" } },
    });
    assertEquals(contacts, []);
  });

  it("'equal' and 'not' acts like just 'equals' when 'not' clause is unsatisified", async () => {
    const contacts = await client.contacts.findMany({
      select: { email: true },
      where: { email: { equals: "emailmaria@hubspot.com", not: "fakeemail" } },
    });
    assertEquals(contacts.length, 1);
    assertEquals(contacts[0].properties.email, "fakeemail");
  });

  it("email equals null", async (ctx) => {
    assertSnapshot(
      ctx,
      sanitiseContactsForSnapshot(
        await client.contacts.findMany({
          where: { email: { equals: null } },
        }),
      ),
    );
  });

  it("email NOT equal null", async (ctx) => {
    assertSnapshot(
      ctx,
      sanitiseContactsForSnapshot(
        await client.contacts.findMany({ where: { email: { not: null } } }),
      ),
    );
  });

  it("followercount equal 123", async (ctx) => {
    assertSnapshot(
      ctx,
      sanitiseContactsForSnapshot(
        await client.contacts.findMany({
          where: { followercount: { equals: 123 } },
        }),
      ),
    );
  });

  it('email not equal "fakeemail"', async (ctx) => {
    assertSnapshot(
      ctx,
      sanitiseContactsForSnapshot(
        await client.contacts.findMany({
          where: { email: { not: "fakeemail" } },
        }),
      ),
    );
  });
});

const sanitiseContactsForSnapshot = (
  contacts: contactsInstance<any>[],
) => {
  return contacts.map((c) => {
    return { ...c, updatedAt: undefined };
  });
};
