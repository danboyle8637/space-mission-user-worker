import { db } from "../helpers/supabase";
import { getErrorMessage } from "../helpers/worker";
import type { Env, FinishMissionBody } from "../types";

export async function finishMission(
  request: Request,
  env: Env
): Promise<Response> {
  const formattedReq = new Response(request.body);
  const body: FinishMissionBody = await formattedReq.json();

  const { userId } = body;

  if (!userId) {
    const response = new Response("Bad Request", { status: 500 });
    return response;
  }

  try {
    const updateRes = await db(env)
      .from("users")
      .update({ active_mission_id: null })
      .eq("user_id", userId);

    if (updateRes.status !== 204) {
      throw new Error("Could not update user doc");
    }

    const response = new Response(
      "Mission completed and removed from active mission",
      {
        status: 200,
      }
    );
    return response;
  } catch (error) {
    const response = new Response(getErrorMessage(error), { status: 500 });
    return response;
  }
}
