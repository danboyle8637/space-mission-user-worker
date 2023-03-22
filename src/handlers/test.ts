import type { Env } from "../types";

export async function test(request: Request, env: Env): Promise<Response> {
  const headers = request.headers;
  const userId = headers.get("user");

  const formattedBody = new Response(request.body);
  const body = await formattedBody.json();

  const resBody = {
    userId: userId,
    bodyData: body,
  };

  return new Response(JSON.stringify(resBody), { status: 200 });
}
