import { exec } from "node:child_process";

const BRANCH = process.env.PREVIEW_BRANCH || "main";
const INTERVAL = Number(process.env.GIT_POLL_INTERVAL || 2000);

let lastSha = null;
let pulling = false;
let authFailed = false;

function run(cmd) {
  return new Promise((resolve, reject) => {
    exec(cmd, { cwd: process.cwd() }, (err, stdout, stderr) => {
      if (err) return reject(stderr || err.message);
      resolve(stdout.trim());
    });
  });
}

async function poll() {
  if (authFailed) return;
  if (pulling) return;

  try {
    pulling = true;

    await run("git fetch origin");
    const sha = await run(`git rev-parse origin/${BRANCH}`);

    if (sha !== lastSha) {
      console.log(`[git-poll] update detected → ${sha}`);
      await run(`git pull origin ${BRANCH}`);
      lastSha = sha;
    }
  } catch (err) {
    const msg = String(err || "");
    console.error("[git-poll] error:", msg);
    if (
      msg.includes("could not read Username") ||
      msg.includes("Authentication failed") ||
      msg.includes("Permission denied")
    ) {
      console.error(
        "[git-poll] auth failed; disabling polling. Provide repo access in REPO_URL or credentials."
      );
      authFailed = true;
    }
  } finally {
    pulling = false;
  }
}

console.log("[git-poll] started");
setInterval(poll, INTERVAL);
