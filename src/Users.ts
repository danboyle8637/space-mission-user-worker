import { Client } from "@neondatabase/serverless";
import type { Env, MissionId } from "./types";

export class Users {
  env;
  db;

  constructor(env: Env) {
    this.env = env;
    this.db = new Client(this.env.NEON_DATABASE);
  }

  async createUser(userId: string, firstName: string, callSign?: string) {
    await this.db.connect();

    const user = await this.db.query(`
      INSERT INTO users 
      (created_at, user_id, first_name)
      VALUES (
        '${userId}',
        '${firstName}',
        '${callSign ? callSign : null}'
      )
      RETURNING user_id, first_name, call_sign;
    `);

    await this.db.end();

    return user.rows;
  }

  async getUser(userId: string) {
    await this.db.connect();

    const user = await this.db.query(`
      SELECT
        first_name, 
        call_sign,
        active_mission_id,
        avatar_url 
      FROM users WHERE user_id = '${userId}';
    `);

    await this.db.end();

    return user.rows;
  }

  async activateMission(userId: string, missionId: MissionId) {
    await this.db.connect();

    const missionStats = await this.db.query(`
      BEGIN;

      UPDATE users
          SET active_mission_id = '${missionId}'
          WHERE user_id = '${userId}'
          RETURNING active_mission_id;
      
      INSERT INTO mission_stats
          (user_id, mission_id, status)
      VALUES ('${userId}', '${missionId}', 'active')
      RETURNING status, is_goal1_complete, is_goal2_complete, is_goal3_complete;
      
      COMMIT;
    `);

    await this.db.end();

    return missionStats;
  }

  async finishMission(userId: string, missionId: MissionId) {}
}
