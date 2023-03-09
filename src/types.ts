export interface Env {
  SUPA_DB_URL: string;
  SUPA_DB_KEY: string;
  SUPA_ACESS_TOKEN: string;
  NEON_DATABASE: string;
  NEON_DATABASE_PASSWORD: string;
}

export type Actions =
  | "create-user"
  | "get-user"
  | "update-user"
  | "activate-mission"
  | "update-avatar"
  | "finish-mission";

export type MissionId = "mars" | "titan" | "pleiades" | "prodigious" | "x24c89";

export interface CreateUserBody {
  userId: string;
  firstName: string;
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
}

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[];

export interface Database {
  public: {
    Tables: {
      accounts: {
        Row: {
          created_at: string;
          email_address: string;
          id: number;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          email_address?: string;
          id?: number;
          user_id?: string;
        };
        Update: {
          created_at?: string;
          email_address?: string;
          id?: number;
          user_id?: string;
        };
      };
      finished_missions: {
        Row: {
          created_at: string | null;
          id: number;
          mission_id: string;
          user_id: string;
        };
        Insert: {
          created_at?: string | null;
          id?: number;
          mission_id: string;
          user_id: string;
        };
        Update: {
          created_at?: string | null;
          id?: number;
          mission_id?: string;
          user_id?: string;
        };
      };
      mission_stats: {
        Row: {
          created_at: string | null;
          id: number;
          is_goal1_complete: boolean | null;
          is_goal2_complete: boolean | null;
          is_goal3_complete: boolean | null;
          mission_id: string;
          status: string;
          user_id: string;
        };
        Insert: {
          created_at?: string | null;
          id?: number;
          is_goal1_complete?: boolean | null;
          is_goal2_complete?: boolean | null;
          is_goal3_complete?: boolean | null;
          mission_id: string;
          status: string;
          user_id: string;
        };
        Update: {
          created_at?: string | null;
          id?: number;
          is_goal1_complete?: boolean | null;
          is_goal2_complete?: boolean | null;
          is_goal3_complete?: boolean | null;
          mission_id?: string;
          status?: string;
          user_id?: string;
        };
      };
      users: {
        Row: {
          active_mission_id: string | null;
          avatar_url: string | null;
          call_sign: string;
          created_at: string | null;
          first_name: string;
          id: number;
          user_id: string;
        };
        Insert: {
          active_mission_id?: string | null;
          avatar_url?: string | null;
          call_sign?: string;
          created_at?: string | null;
          first_name?: string;
          id?: number;
          user_id?: string;
        };
        Update: {
          active_mission_id?: string | null;
          avatar_url?: string | null;
          call_sign?: string;
          created_at?: string | null;
          first_name?: string;
          id?: number;
          user_id?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
