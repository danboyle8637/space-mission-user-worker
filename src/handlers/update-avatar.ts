import type { Env } from "../types";

export async function updateAvatar(
  request: Request,
  env: Env
): Promise<Response> {
  return new Response("Need to get Images working", { status: 200 });
}
