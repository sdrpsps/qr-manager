import { readFileSync } from "fs";
import { join } from "path";
import { exec } from "child_process";
import { promisify } from "util";

import JSONC from "tiny-jsonc";

import { MigrateMode, WranglerConfig } from "./types";

const execAsync = promisify(exec);

async function migrate() {
  // Get the mode from the command line arguments
  const args = process.argv.slice(2) as MigrateMode;
  const mode = args[0];

  if (!mode || !["local", "remote"].includes(mode)) {
    console.error("请提供一个模式: local 或 remote");
    process.exit(1);
  }

  console.log(`在 ${mode} 模式下迁移`);

  // Read wrangler.jsonc
  const wranglerJsonPath = join(process.cwd(), "wrangler.jsonc");
  let config: WranglerConfig;

  try {
    const wranglerJson = readFileSync(wranglerJsonPath, "utf8");
    config = JSONC.parse(wranglerJson) as WranglerConfig;
  } catch {
    console.error("错误: 无法解析 wrangler.jsonc 或 wrangler.jsonc 未找到");
    process.exit(1);
  }

  if (!config.d1_databases?.[0]?.database_name) {
    console.error("错误: 未找到 wrangler.jsonc 中的数据库名称");
    process.exit(1);
  }

  const dbName = config.d1_databases[0].database_name;

  // Generate migrations
  console.log("生成迁移...");
  await execAsync("drizzle-kit generate");

  // Apply migrations
  console.log(`应用迁移到 ${mode} 数据库: ${dbName}`);
  try {
    await execAsync(`wrangler d1 migrations apply ${dbName} --${mode}`);
  } catch (error) {
    console.error(`应用迁移到 ${mode} 数据库: ${dbName} 失败: ${error}`);
    process.exit(1);
  }

  console.log("迁移完成！");
}

migrate();
