import { afterAll, beforeAll, describe, it } from "https://deno.land/std@0.201.0/testing/bdd.ts";
import { createForTesting } from "./axios_snapshot.ts";
import { assertEquals, assertMatch, assertRejects, assertThrows } from "https://deno.land/std@0.201.0/assert/mod.ts";

describe("axios snapshot test", () => {
  describe("getCurrentContextId", () => {
    it("returns context id", () => {
      const result = (function AxiosSnapshotTag$123() {
        return getCurrentContextId();
      })();

      assertEquals(result, "AxiosSnapshotTag$123");
    });

    it("returns null", () => {
      assertEquals(getCurrentContextId(), null);
    });

    it("fails when multiple contextsx", () => {
      assertThrows(() => {
        (function AxiosSnapshotTag$123() {
          (function AxiosSnapshotTag$456() {
            getCurrentContextId();
          })();
        })();
      });
    });
  });

  describe("createUniqueContextId", () => {
    it("can be part of a function name", async () => {
      const id = await createUniqueContextId("teststring");
      assertMatch(id, /[a-z0-9]+/);
    });
  });

  describe("withContext", () => {
    it("returns result from callback", async (ctx) => {
      const result = await withAxiosContext(ctx.name, () => Promise.resolve("myresullt"));
      assertEquals(result, "myresullt");
    });

    it("sets context ID in callstack", async (ctx) => {
      assertEquals(getCurrentContextId(), null);
      const result = await withAxiosContext(ctx.name, () => Promise.resolve(getCurrentContextId()));
      assertEquals(typeof result === "string" && result.startsWith(CONTEXT_PREFIX), true);
      assertEquals(getCurrentContextId(), null);
    });

    it("works when used multiple times", async (ctx) => {
      await withAxiosContext(`${ctx.name}-1`, async () => {});
      await withAxiosContext(`${ctx.name}-2`, async () => {});
    });

    it("errors when text is used in multiple places", async (ctx) => {
      await withAxiosContext(ctx.name, async () => {});
      await assertRejects(() => withAxiosContext(ctx.name, async () => {}));
    });

    it("remembers context text", async (ctx) => {
      const result = await withAxiosContext(ctx.name, () => Promise.resolve(getCurrentContextText()));
      assertEquals(result, ctx.name);
    });
  });
});
