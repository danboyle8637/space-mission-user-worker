import {
  createUser,
  getUser,
  activateMission,
  updateAvatar,
  finishMission,
  test,
} from "./handlers";
import type { Env, Actions } from "./types";

export default {
  async fetch(
    request: Request,
    env: Env,
    ctx: ExecutionContext
  ): Promise<Response> {
    const url = new URL(request.url);
    const workerAction: Actions = url.pathname.split("/").pop() as Actions;

    switch (workerAction) {
      case "create-user": {
        if (request.method !== "POST") {
          return new Response("Bad Request", { status: 405 });
        }

        return createUser(request, env);
      }
      case "get-user": {
        if (request.method !== "GET") {
          return new Response("Bad Request", { status: 405 });
        }

        return getUser(request, env);
      }
      case "activate-mission": {
        if (request.method !== "POST") {
          return new Response("Bad Request", { status: 405 });
        }

        return activateMission(request, env);
      }
      case "update-avatar": {
        if (request.method !== "PATCH") {
          return new Response("Bad Request", { status: 405 });
        }

        return updateAvatar(request, env);
      }
      case "finish-mission": {
        if (request.method !== "PATCH") {
          return new Response("Bad Request", { status: 405 });
        }

        return finishMission(request, env);
      }
      case "test": {
        if (request.method !== "POST") {
          return new Response("Bad Request", { status: 405 });
        }

        return test(request, env);
      }
      default: {
        return new Response("Bad Request", { status: 500 });
      }
    }
  },
};
