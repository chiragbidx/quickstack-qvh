import { spawn, execSync } from "node:child_process";
import fs from "node:fs";

const BRANCH = process.env.PREVIEW_BRANCH || "main";
const REPO_URL = process.env.REPO_URL;
const PORT = process.env.PORT || "8080";
const HOST = process.env.HOST || "0.0.0.0";

function run(name, cmd, args) {
  const p = spawn(cmd, args, {
    stdio: "inherit",
    shell: true,
    env: process.env,
  });

  p.on("exit", (code) => {
    console.error(`[supervisor] ${name} exited with code ${code}`);
    process.exit(code ?? 1);
  });

  return p;
}

console.log("[supervisor] ensuring git repo");

if (!fs.existsSync(".git")) {
  if (!REPO_URL) {
    console.error("[supervisor] REPO_URL missing");
    process.exit(1);
  }

  try {
    execSync("git init", { stdio: "inherit" });
    execSync(`git remote add origin ${REPO_URL}`, { stdio: "inherit" });
    execSync("git fetch origin --depth=1", { stdio: "inherit" });
    execSync(`git reset --hard origin/${BRANCH}`, { stdio: "inherit" });
    execSync("git clean -fd", { stdio: "inherit" });
  } catch (err) {
    console.error(
      "[supervisor] git bootstrap failed (likely auth). Continuing with existing workspace."
    );
  }
}

console.log("[supervisor] starting Next.js dev server");

// CALL NEXT DIRECTLY (NO pnpm, NO `--`)
run("next-dev", "./node_modules/.bin/next", [
  "dev",
  "--turbopack",
  "-H",
  HOST,
  "-p",
  PORT,
]);

console.log("[supervisor] starting git poller");

run("git-poll", "node", ["scripts/git-poll.js"]);
