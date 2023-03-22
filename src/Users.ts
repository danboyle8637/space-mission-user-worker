import { connect, Connection } from "@planetscale/database";
import type {
  Env,
  MissionId,
  MissionStatus,
  GetUserResponse,
  UserDoc,
} from "./types";

export class Users {
  env;
  private config;

  constructor(env: Env) {
    this.env = env;

    this.config = {
      host: env.PLANETSCALE_HOST,
      username: env.PLANETSCALE_USERNAME,
      password: env.PLANETSCALE_PASSWORD,
    };
  }

  async createUser(
    userId: string,
    firstName: string,
    emailAddress: string,
    callSign: string
  ) {
    const ps: Connection = await connect(this.config);

    const createUserQuery = `
      INSERT INTO users
      (user_id, first_name, call_sign)
      VALUES (:userId, :firstName, :callSign);
    `;

    const createUserAccountQuery = `
      INSERT INTO accounts
      (user_id, email_address)
      VALUES (:userId, :emailAddress);
    `;

    const createUserParams = {
      userId: userId,
      firstName: firstName,
      callSign: callSign,
    };

    const createUserAccountParams = {
      userId: userId,
      emailAddress: emailAddress,
    };

    await ps.transaction(async (tx) => {
      await tx.execute(createUserQuery, createUserParams);
      await tx.execute(createUserAccountQuery, createUserAccountParams);
    });

    return "User created";
  }

  async getUser(userId: string) {
    const ps: Connection = await connect(this.config);

    const userQuery = `
      SELECT first_name, call_sign, active_mission_id, avatar_url 
      FROM users WHERE user_id = :userId;
    `;

    const finishedMissionQuery = `
    SELECT mission_id FROM finished_missions WHERE user_id = :userId;
    `;

    const userParams = {
      userId: userId,
    };

    const finishedMissionParams = {
      userId: userId,
    };

    const userDoc = await ps.transaction(async (tx) => {
      const userData = await tx.execute(userQuery, userParams);
      const finishedMissionsData = await tx.execute(
        finishedMissionQuery,
        finishedMissionParams
      );

      const user = userData.rows[0] as GetUserResponse;
      const finishedMissions = finishedMissionsData.rows;

      const userDoc: UserDoc = {
        firstName: user.first_name,
        activeMission: user.active_mission_id,
        finishedMissions: finishedMissions,
        callsign: user.call_sign,
        avatar: user.avatar_url,
      };

      return userDoc;
    });

    return userDoc;
  }

  async activateMission(userId: string, missionId: MissionId) {
    const ps: Connection = await connect(this.config);

    const updateUserQuery = `
      UPDATE users
      SET active_mission_id = :missionId
      WHERE user_id = :userId;
    `;

    const createMissionStatsQuery = `
      INSERT INTO mission_stats
      (user_id, mission_id, status)
      VALUES (:userId, :missionId, 'active');
    `;

    const queryParams = {
      missionId: missionId,
      userId: userId,
    };

    const getUserParams = {
      userId: userId,
    };

    await ps.transaction(async (tx) => {
      await tx.execute(updateUserQuery, queryParams);
      await tx.execute(createMissionStatsQuery, queryParams);
      return;
    });

    return "Mission Activated";
  }

  async finishOrCancelMission(userId: string) {
    const ps: Connection = connect(this.config);

    const updateUserQuery = `
      UPDATE users
      SET active_mission_id = null
      WHERE user_id = :userId;
    `;

    const updateUserParams = {
      userId: userId,
    };

    await ps.execute(updateUserQuery, updateUserParams);

    return "User updated";
  }
}
