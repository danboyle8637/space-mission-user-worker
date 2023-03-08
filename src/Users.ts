import { Client } from "@neondatabase/serverless";
import type { Env } from "./types";

export class Users {
  env;
  db;

  constructor(env: Env) {
    this.env = env;
    this.db = new Client(this.env.NEON_DATABASE);
  }

  async createTable() {
    await this.db.connect();
    await this.db.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL,
        created_at INTEGER NOT NULL,
        user_id VARCHAR(255) NOT NULL UNIQUE,
        first_name VARCHAR(60) NOT NULL,
        active_mission_id VARCHAR(20) NULL,
        avatar_url VARCHAR(255) NULL,
        PRIMARY KEY (id)
      );
    `);

    await this.db.end();

    return "Table Created";
  }

  async createUser(userId: string, firstName: string) {
    const now = Date.now();

    await this.db.connect();

    const user = await this.db.query(`
      INSERT INTO users 
      (created_at, user_id, first_name)
      VALUES (
        '${now}',
        '${userId}',
        '${firstName}'
      )
      RETURNING user_id, first_name;
    `);

    console.log(JSON.stringify(user.rows));

    await this.db.end();

    return user.rows;
  }
}
