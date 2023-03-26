import { getErrorMessage } from "../helpers/worker";
import type { Env, DeleteUserSessionBody } from "../types";

export async function deleteDevSession(
  request: Request,
  env: Env
): Promise<Response> {
  const formattedReq = new Response(request.body);
  const body: DeleteUserSessionBody = await formattedReq.json();
  const { uuid } = body;

  if (!uuid) {
    const response = new Response("Bad Request. Missing Session Info", {
      status: 403,
    });
    return response;
  }

  try {
    await env.SPACE_MISSION_SESSIONS.delete(uuid);

    const respnose = new Response("Session Deleted", { status: 200 });
    return respnose;
  } catch (error) {
    const response = new Response(getErrorMessage(error), { status: 500 });
    return response;
  }
}
