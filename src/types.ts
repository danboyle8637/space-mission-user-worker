export interface Env {
  SUPA_DB_URL: string;
  SUPA_DB_KEY: string;
  SUPA_ACESS_TOKEN: string;
  NEON_DATABASE: string;
  NEON_DATABASE_PASSWORD: string;
  PLANETSCALE_HOST: string;
  PLANETSCALE_USERNAME: string;
  PLANETSCALE_PASSWORD: string;
}

export type Actions =
  | "create-user"
  | "get-user"
  | "update-user"
  | "activate-mission"
  | "update-avatar"
  | "finish-mission"
  | "test";

export type MissionId = "mars" | "titan" | "pleiades" | "prodigious" | "x24c89";

export type MissionStatus = "active" | "complete" | "cancelled";

export interface CreateUserBody {
  firstName: string;
  emailAddress: string;
  callSign: string;
}

export interface ActivateMissionBody {
  missionId: MissionId;
}

export interface FinishMissionBody {
  userId: string;
}

export interface GetUserResponse {
  first_name: string;
  call_sign: string;
  active_mission_id: MissionId | null;
  avatar_url: string | null;
}

export interface UserDoc {
  firstName: string;
  activeMission: MissionId | null;
  finishedMissions: any[];
  callsign: string;
  avatar: string | null;
}
