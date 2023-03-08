import { Env } from "../types";

export async function createUser(
  request: Request,
  env: Env
): Promise<Response> {
  return new Response("New User!", { status: 200 });
}
