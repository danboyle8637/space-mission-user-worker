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
  | "finish-mission";

export type MissionId = "mars" | "titan" | "pleiades" | "prodigious" | "x24c89";

export type MissionStatus = "active" | "complete" | "cancelled";

export interface CreateUserBody {
  userId: string;
  firstName: string;
  emailAddress: string;
  callSign: string;
}

export interface GetUserBody {
  userId: string;
}

export interface ActivateMissionBody {
  userId: string;
  missionId: MissionId;
}

export interface FinishMissionBody {
  userId: string;
  missionId: string;
  missionStatus: MissionStatus;
}
