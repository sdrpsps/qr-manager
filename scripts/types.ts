export type MigrateMode = ["local", "remote"];

export interface D1Database {
  binding: string;
  database_name: string;
  database_id: string;
}

export interface WranglerConfig {
  d1_databases: D1Database[];
  vars: Record<string, string>;
  routes: { pattern: string; custom_domain: boolean }[];
}
