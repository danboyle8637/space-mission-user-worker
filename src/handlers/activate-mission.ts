import { Users } from "../Users";
import { db } from "../helpers/supabase";
import { getErrorMessage } from "../helpers/worker";
import type { Env, ActivateMissionBody } from "../types";

export async function activateMission(
  request: Request,
  env: Env
): Promise<Response> {
  const headers = request.headers;
  const userId = headers.get("user");

  const formattedReq = new Response(request.body);
  const body: ActivateMissionBody = await formattedReq.json();

  const { missionId } = body;

  if (!userId || !missionId) {
    const response = new Response("Bad Request", { status: 500 });
    return response;
  }

  try {
    const users = new Users(env);

    const activateMission = await users.activateMission(userId, missionId);

    const response = new Response(JSON.stringify(activateMission), {
      status: 200,
    });
    return response;
  } catch (error) {
    const response = new Response(getErrorMessage(error), { status: 500 });
    return response;
  }
}
