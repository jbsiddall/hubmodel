import { assertEquals, assertNotEquals, assertRejects, assertThrows, describe, it } from "../test_deps.ts";
import {
  createForTesting,
  generateContextName,
  getCallStackContextId,
  getCallStackSnapshotId,
  NotInContextError,
} from "./axios_snapshot.ts";
import { AxiosInstance, axios as realAxios } from "../deps.ts";

describe("generateContextName", () => {
  it("context names are fully qualified", (ctx) => {
    assertEquals(
      generateContextName(ctx),
      "'generateContextName' -> 'context names are fully qualified'",
    );
    assertEquals(
      generateContextName(ctx, "extra"),
      "'generateContextName' -> 'context names are fully qualified' -> 'extra'",
    );
  });
});

it("getCallStackSnapshotId", () => {
  assertEquals(getCallStackSnapshotId({ snapshotId: "343" }), "AS$I343$");
});

it("getCallStackContextId - works", () => {
  assertEquals(getCallStackContextId({ snapshotId: "343", contextId: 456 }), "AS$I343$C456");
});

describe("getCurrentContextId", () => {
  it("returns context id", () => {
    const { getRunningStackId } = createForTesting({ axios: createPlainAxiosDecoy(), snapshotInstanceId: "TESTID" });
    const result = (function AS$ITESTID$C2() {
      return getRunningStackId();
    })();

    assertEquals(result, "AS$ITESTID$C2");
  });

  it("fails when not in context", () => {
    const { getRunningStackId } = createForTesting({ axios: createPlainAxiosDecoy() });
    assertThrows(() => getRunningStackId(), NotInContextError);
  });

  it("fails when multiple contexts", () => {
    const { getRunningStackId } = createForTesting({ axios: createPlainAxiosDecoy() });
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

  it("ignores other instance contexts", () => {
    const { getRunningStackId } = createForTesting({ axios: createPlainAxiosDecoy(), snapshotInstanceId: "TEST_ID" });

    const result = (function AS$IOTHER_ID$C1() {
      return (function AS$ITEST_ID$C1() {
        return getRunningStackId();
      })();
    })();

    assertEquals(result, "AS$ITEST_ID$C1");

    const result2 = (function AS$ITEST_ID$C1() {
      return (function AS$I2$C1() {
        return getRunningStackId();
      })();
    })();

    assertEquals(result2, "AS$ITEST_ID$C1");
  });
});

describe("assertSameNetworkRequests", () => {
  it("returns result from callback", async (ctx) => {
    const { assertSameNetworkRequests } = createForTesting({ axios: createPlainAxiosDecoy() });
    const result = await assertSameNetworkRequests({ ctx }, () => Promise.resolve("myresullt" as const));
    assertEquals(result, "myresullt");
  });

  it("sets context ID in callstack", async (ctx) => {
    const { assertSameNetworkRequests, getRunningStackId, snapshotInstanceId } = createForTesting({ axios: createPlainAxiosDecoy() });
    const result = await assertSameNetworkRequests({ ctx }, () => Promise.resolve(getRunningStackId()));
    assertEquals(result.startsWith(getCallStackSnapshotId({ snapshotId: snapshotInstanceId })), true);
  });

  it("context id always unique", async (ctx) => {
    const { assertSameNetworkRequests, getRunningStackId } = createForTesting({ axios: createPlainAxiosDecoy() });
    const id1 = await assertSameNetworkRequests({ ctx, name: '1' }, () => Promise.resolve(getRunningStackId()));
    const id2 = await assertSameNetworkRequests({ ctx, name: '2' }, () => Promise.resolve(getRunningStackId()));
    assertNotEquals(id1, id2);
  });

  it("Snapshot instances always have unique IDs", () => {
    const { snapshotInstanceId: s1 } = createForTesting({ axios: createPlainAxiosDecoy() });
    const { snapshotInstanceId: s2 } = createForTesting({ axios: createPlainAxiosDecoy() });
    assertNotEquals(s1, s2);
  });

  it("cleans up state after context ends", async (ctx) => {
    const { assertSameNetworkRequests, getState } = createForTesting({ axios: createPlainAxiosDecoy() });
    await assertSameNetworkRequests({ ctx }, () => Promise.resolve({}));
    assertEquals(getState().runningContexts, {});
  });

  it("adds cache entry even when no requests made", async (ctx) => {
    const { assertSameNetworkRequests, getState } = createForTesting({
      axios: createPlainAxiosDecoy(),
      snapshotInstanceId: "TID",
    });
    await assertSameNetworkRequests({ ctx }, () => Promise.resolve({}));

    assertEquals(Object.keys(getState().cache).length, 1);
  });

  it("errors when same context is used in multiple times", async (ctx) => {
    const { assertSameNetworkRequests } = createForTesting({ axios: createPlainAxiosDecoy() });
    await assertSameNetworkRequests({ ctx }, async () => {});
    await assertRejects(() => assertSameNetworkRequests({ ctx }, () => Promise.resolve({})));
  });

  it("same context can be used multiple times if an additional name provided", async (ctx) => {
    const { assertSameNetworkRequests } = createForTesting({ axios: createPlainAxiosDecoy() });
    await assertSameNetworkRequests({ ctx }, async () => {});
    await assertSameNetworkRequests({ ctx, name: "second usage" }, async () => {});
  });
});

describe('axios defaults', () => {
  it('proxy axios still retrieves all axios defaults', () => {
    const { axios } = createForTesting({ axios: createPlainAxiosDecoy()});
    assertEquals(axios.defaults.headers.common.Accept, 'mytest')
  })
  it('axios defaults can be set and retrieved', () => {
    const { axios } = createForTesting({ axios: createPlainAxiosDecoy() });
    axios.defaults.headers.common["User-Agent"] = "Test"
    assertEquals(axios.defaults.headers.common['User-Agent'], 'Test')
  })
  it('defaults have an effect when real axios requests made', {sanitizeResources: false, sanitizeOps: false}, async ctx => {
    const axiosInst = realAxios.create()
    const { axios, assertSameNetworkRequests } = createForTesting({ axios: axiosInst });
    axios.defaults.baseURL = 'http://github.com/'
    await assertRejects(
      async () => {
        await assertSameNetworkRequests({ ctx, expectedRequestHashes: ['UTNyU0RqKzVTVUkrRTJUeWtGYWdZODBUaEtVPQ=='] }, async () => {
          console.log('before', Deno.resources())
          try {
            await axios.get('/fakepath')
          } catch (e) {
            console.log('oops', e)
            throw e
          }
          console.log('after')
        })
      },
      'PermissionDenied2: Requires net access to "github.com", run again with the --allow-net flag'
    )
  })
})

const createPlainAxiosDecoy = () => ({
  defaults: {
      headers: {
        common: {
          Accept: 'mytest'
        }
      }
    }
}) as AxiosInstance