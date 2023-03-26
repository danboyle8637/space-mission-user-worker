import { getErrorMessage } from "../helpers/worker";
import type { Env, UserSessionReqBody, UserSession } from "../types";

export async function createDevSession(
  request: Request,
  env: Env
): Promise<Response> {
  const formattedReq = new Response(request.body);
  const body: UserSessionReqBody = await formattedReq.json();
  const { uuid, userId, phoneId, sessionToken, sessionId, expiresAt } = body;

  if (
    !uuid ||
    !userId ||
    !phoneId ||
    !sessionToken ||
    !sessionId ||
    !expiresAt
  ) {
    const response = new Response("Bad Request. Missing Session Info", {
      status: 403,
    });
    return response;
  }

  try {
    const userSession: UserSession = {
      userId: userId,
      phoneId: phoneId,
      sessionToken: sessionToken,
      sessionId: sessionId,
      expiresAt: expiresAt,
    };

    await env.SPACE_MISSION_SESSIONS.put(uuid, JSON.stringify(userSession));

    const respnose = new Response("Session Created", { status: 200 });
    return respnose;
  } catch (error) {
    const response = new Response(getErrorMessage(error), { status: 500 });
    return response;
  }
}
