import { afterAll, beforeAll, describe, it } from "https://deno.land/std@0.201.0/testing/bdd.ts";
import {
  createForTesting,
  generateContextName,
  getCallStackContextId,
  getCallStackSnapshotId,
  NotInContextError,
} from "./axios_snapshot.ts";
import { assertEquals, assertMatch, assertRejects, assertThrows } from "https://deno.land/std@0.201.0/assert/mod.ts";
import { AxiosInstance } from "../deps.ts";
import { getTestRunnerCode } from "https://deno.land/x/dnt@0.38.1/lib/test_runner/get_test_runner_code.ts";
import { assertNotEquals } from "https://deno.land/std@0.201.0/assert/assert_not_equals.ts";

describe("axios snapshot test", () => {
  describe("generateContextName", () => {
    it("context names are fully qualified", (ctx) => {
      assertEquals(
        generateContextName(ctx),
        "'axios snapshot test' -> 'generateContextName' -> 'context names are fully qualified'",
      );
      assertEquals(
        generateContextName(ctx, "extra"),
        "'axios snapshot test' -> 'generateContextName' -> 'context names are fully qualified' -> 'extra'",
      );
    });
  });

  it("getCallStackSnapshotId", () => {
    assertEquals(getCallStackSnapshotId({ snapshotId: 343 }), "AS$I343");
  });
  it("getCallStackContextId - works", () => {
    assertEquals(getCallStackContextId({ snapshotId: 343, contextId: 456 }), "AS$I343$C456");
  });
  it("getCallStackContextId - valid variable name", () => {
    const identifier = getCallStackContextId({ snapshotId: 343, contextId: 456 });
    const result = [] as string[];
    eval(`const ${identifier} = "working"; result.push(${identifier})`);
    assertEquals(result, ["working"]);
  });

  describe("getCurrentContextId", () => {
    it("returns context id", async () => {
      const { getRunningStackId } = await createForTesting({ axios: {} as AxiosInstance });
      const result = (function AS$I1$C2() {
        return getRunningStackId();
      })();

      assertEquals(result, "AS$I1$C2");
    });

    it("fails when not in context", async () => {
      const { getRunningStackId } = await createForTesting({ axios: {} as AxiosInstance });
      assertThrows(() => getRunningStackId(), NotInContextError);
    });

    it("fails when multiple contexts", async () => {
      const { getRunningStackId } = await createForTesting({ axios: {} as AxiosInstance });
      assertThrows(() => {
        (function AS$I1$C1() {
          (function AS$I1$C1() {
            getRunningStackId();
          })();
        })();
      });

      assertThrows(() => {
        (function AS$I1$C1() {
          (function AS$I1$C2() {
            getRunningStackId();
          })();
        })();
      });
    });

    it("ignores other instance contexts", async () => {
      const { getRunningStackId } = await createForTesting({ axios: {} as AxiosInstance });

      const result = (function AS$I2$C1() {
        return (function AS$I1$C1() {
          return getRunningStackId();
        })();
      })();

      assertEquals(result, "AS$I1$C1");

      const result2 = (function AS$I1$C1() {
        return (function AS$I2$C1() {
          return getRunningStackId();
        })();
      })();

      assertEquals(result2, "AS$I1$C1");
    });
  });

  describe("assertSameNetworkRequests", () => {
    it("returns result from callback", async (ctx) => {
      const { assertSameNetworkRequests } = await createForTesting({ axios: {} as AxiosInstance });
      const result = await assertSameNetworkRequests({ ctx }, () => Promise.resolve("myresullt" as const));
      assertEquals(result, "myresullt");
    });

    it("sets context ID in callstack", async (ctx) => {
      const { assertSameNetworkRequests, getRunningStackId } = await createForTesting({ axios: {} as AxiosInstance });
      const result = await assertSameNetworkRequests({ ctx }, () => Promise.resolve(getRunningStackId()));
      assertEquals(result.startsWith(getCallStackSnapshotId({ snapshotId: 1 })), true);
    });

    it("context id always unique", async (ctx) => {
      const { assertSameNetworkRequests, getRunningStackId } = await createForTesting({ axios: {} as AxiosInstance });
      const id1 = await assertSameNetworkRequests({ ctx }, () => Promise.resolve(getRunningStackId()));
      const id2 = await assertSameNetworkRequests({ ctx }, () => Promise.resolve(getRunningStackId()));
      assertNotEquals(id1, id2);
    });

    it("Snapshot instances always have unique IDs", async () => {
      const { snapshotInstanceId: s1 } = await createForTesting({ axios: {} as AxiosInstance });
      const { snapshotInstanceId: s2 } = await createForTesting({ axios: {} as AxiosInstance });
      assertNotEquals(s1, s2);
    });

    it("cleans up state after context ends", async (ctx) => {
      const { assertSameNetworkRequests, getState } = await createForTesting({ axios: {} as AxiosInstance });
      await assertSameNetworkRequests({ ctx }, () => Promise.resolve({}));
      assertEquals(getState().runningContexts, {});
    });

    it("adds cache entry even when no requests made", async (ctx) => {
      const { assertSameNetworkRequests, getState } = await createForTesting({ axios: {} as AxiosInstance });
      await assertSameNetworkRequests({ ctx }, () => Promise.resolve({}));
      assertEquals(Object.values(getState().cache), []);
    });

    it("errors when same context is used in multiple times", async (ctx) => {
      const { assertSameNetworkRequests } = await createForTesting({ axios: {} as AxiosInstance });
      await assertSameNetworkRequests({ ctx }, async () => {});
      await assertRejects(() => assertSameNetworkRequests({ ctx }, async () => Promise.resolve({})));
    });

    it("same context can be used multiple times if an additional name provided", async (ctx) => {
      const { assertSameNetworkRequests } = await createForTesting({ axios: {} as AxiosInstance });
      await assertSameNetworkRequests({ ctx }, async () => {});
      await assertSameNetworkRequests({ ctx, name: "second usage" }, async () => {});
    });
  });
});
