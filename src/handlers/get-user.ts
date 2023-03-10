import { Users } from "../Users";
import { db } from "../helpers/supabase";
import { getErrorMessage } from "../helpers/worker";
import type { Env, GetUserBody } from "../types";

export async function getUser(request: Request, env: Env): Promise<Response> {
  const formattedReq = new Response(request.body);
  const data: GetUserBody = await formattedReq.json();

  const { userId } = data;

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
    const response = new Response(getErrorMessage(error), { status: 500 });
    return response;
  }
}
