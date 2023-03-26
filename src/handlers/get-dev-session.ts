import { getErrorMessage } from "../helpers/worker";
import type { Env, UserSession, UserSessionRes } from "../types";

export async function getDevSession(
  request: Request,
  env: Env
): Promise<Response> {
  const headers = request.headers;
  const uuid = headers.get("sessionToken");

  if (!uuid) {
    const response = new Response("Bad Request. Missing Token", {
      status: 403,
    });
    return response;
  }

  try {
    const session = await env.SPACE_MISSION_SESSIONS.get(uuid);

    if (!session) {
      throw new Error("No active session. Log in again");
    }

    const sessionData: UserSession = JSON.parse(session);
    const { userId, sessionId, expiresAt } = sessionData;

    const resBody: UserSessionRes = {
      userId: userId,
      sessionId: sessionId,
      expiresAt: expiresAt,
    };

    const response = new Response(JSON.stringify(resBody), { status: 200 });
    return response;
  } catch (error) {
    const response = new Response(getErrorMessage(error), { status: 500 });
    return response;
  }
}
