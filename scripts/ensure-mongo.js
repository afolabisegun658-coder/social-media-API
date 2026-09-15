const { spawn } = require("child_process");
const fs = require("fs");

const mongoPath = "C:\\Program Files\\MongoDB\\Server\\8.3\\bin\\mongod.exe";
const dbPath = "C:\\data\\db";
const logPath = "C:\\data\\db\\mongod.log";

const ensureMongo = () => {
  if (!fs.existsSync(mongoPath)) {
    console.warn("MongoDB binary not found at expected path:", mongoPath);
    return;
  }

  if (!fs.existsSync(dbPath)) {
    fs.mkdirSync(dbPath, { recursive: true });
  }

  const check = spawn("powershell", [
    "-NoProfile",
    "-Command",
    "(Get-NetTCPConnection -LocalPort 27017 -ErrorAction SilentlyContinue | Measure-Object).Count"
  ]);

  check.stdout.on("data", (data) => {
    const count = Number(String(data).trim()) || 0;
    if (count > 0) {
      process.exit(0);
    }
  });

  check.on("close", () => {
    const mongo = spawn(mongoPath, [
      "--dbpath",
      dbPath,
      "--port",
      "27017",
      "--logpath",
      logPath,
      "--bind_ip",
      "127.0.0.1"
    ], {
      detached: true,
      stdio: "ignore"
    });

    mongo.unref();
    setTimeout(() => process.exit(0), 3000);
  });
};

ensureMongo();
