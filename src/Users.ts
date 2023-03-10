import { connect, Connection } from "@planetscale/database";
import type { Env, MissionId, MissionStatus } from "./types";

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

    const query = `
      SELECT first_name, call_sign, active_mission_id, avatar_url 
      FROM users WHERE user_id = :userId;
    `;

    const params = {
      userId: userId,
    };

    const result = await ps.execute(query, params);

    return result.rows[0];
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

    await ps.transaction(async (tx) => {
      await tx.execute(updateUserQuery, queryParams);
      await tx.execute(createMissionStatsQuery, queryParams);
      return;
    });

    return "Mission Activated";
  }

  async finishMission(
    userId: string,
    missionId: MissionId,
    missionStatus: MissionStatus
  ) {
    const ps: Connection = connect(this.config);

    const updateUserQuery = `
      UPDATE users
      SET active_mission_id = null
      WHERE user_id = :userId;
    `;

    const updateMissionStatsQuery = `
      UPDATE mission_stats
      SET status = 'cancelled'
      WHERE user_id = :userId AND status = :missionStatus;
    `;

    const createFinishedMissionQuery = `
      INSERT INTO finished_missions
      (user_id, mission_id)
      VALUES (:userId, :missionId);
    `;

    const updateUserParams = {
      userId: userId,
    };

    const updateMissionStatsParams = {
      userId: userId,
      missionStatus: missionStatus,
    };

    const createFinishedMissionParams = {
      userId: userId,
      missionId: missionId,
    };

    await ps.transaction(async (tx) => {
      await tx.execute(updateUserQuery, updateUserParams);
      await tx.execute(updateMissionStatsQuery, updateMissionStatsParams);
      await tx.execute(createFinishedMissionQuery, createFinishedMissionParams);
      return;
    });

    return "Finished mission created";
  }
}
