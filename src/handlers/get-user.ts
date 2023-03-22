import { Users } from "../Users";
import { getErrorMessage } from "../helpers/worker";
import type { Env, GetUserResponse } from "../types";

export async function getUser(request: Request, env: Env): Promise<Response> {
  const headers = request.headers;
  const userId = headers.get("user");

  if (!userId) {
    const response = new Response("Bad Request", { status: 500 });
    return response;
  }

  try {
    const users = new Users(env);

    const user = await users.getUser(userId);

    const response = new Response(JSON.stringify(user), { status: 200 });
    return response;
  } catch (error) {
    const response = new Response(
      `Failed to hit Planetscale: ${getErrorMessage(error)}`,
      { status: 500 }
    );
    return response;
  }
}
