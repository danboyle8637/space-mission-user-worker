import { Users } from "../Users";
import { db } from "../helpers/supabase";
import { getErrorMessage } from "../helpers/worker";
import type { Env, CreateUserBody } from "../types";

export async function createUser(
  request: Request,
  env: Env
): Promise<Response> {
  const formattedReq = new Response(request.body);
  const body: CreateUserBody = await formattedReq.json();
  const { userId, firstName } = body;

  if (!userId || !firstName) {
    const response = new Response("Bad Request", { status: 400 });
    return response;
  }

  try {
    const users = new Users(env);

    const user = await users.createUser(userId, firstName);

    console.log("Neon: ", user);

    const response = new Response("User Created", { status: 200 });
    return response;
  } catch (error) {
    const response = new Response(getErrorMessage(error), { status: 500 });
    return response;
  }
}
