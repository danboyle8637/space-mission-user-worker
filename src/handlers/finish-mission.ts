import { Users } from "../Users";
import { getErrorMessage } from "../helpers/worker";
import type { Env, FinishMissionBody, MissionId } from "../types";

export async function finishMission(
  request: Request,
  env: Env
): Promise<Response> {
  const formattedReq = new Response(request.body);
  const body: FinishMissionBody = await formattedReq.json();

  const { userId } = body;

  if (!userId) {
    const response = new Response("Bad Request", { status: 500 });
    return response;
  }

  try {
    const users = new Users(env);

    const finishedMission = await users.finishOrCancelMission(userId);

    const response = new Response(JSON.stringify(finishedMission), {
      status: 200,
    });
    return response;
  } catch (error) {
    const response = new Response(getErrorMessage(error), { status: 500 });
    return response;
  }
}
