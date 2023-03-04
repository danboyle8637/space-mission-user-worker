import {
  getUser,
  activateMission,
  updateAvatar,
  finishMission,
} from "./handlers";
import type { Env, Actions } from "./types";

export default {
  async fetch(
    request: Request,
    env: Env,
    ctx: ExecutionContext
  ): Promise<Response> {
    const acitonRequest = request.clone();

    const url = new URL(request.url);
    const workerAction: Actions =
      (url.pathname.split("/").pop() as Actions) || "";

    switch (workerAction) {
      case "get-user": {
        return getUser(acitonRequest, env);
      }
      case "activate-mission": {
        return activateMission(acitonRequest, env);
      }
      case "update-avatar": {
        return updateAvatar(acitonRequest, env);
      }
      case "finish-mission": {
        return finishMission(acitonRequest, env);
      }
      default: {
        return new Response("Bad Request", { status: 500 });
      }
    }
  },
};
