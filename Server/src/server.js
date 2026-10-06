import app from "./app.js";
import { dataBaseConnection } from "./config/db.js";

let server;

const startServer = async () => {
  const PORT = process.env.PORT;
  await dataBaseConnection();

  server = app.listen(PORT || 5000, () => {
    console.log(
      `[SERVER] Running in ${process.env.PORT} mode on port ${
        process.env.PORT
      }`,
    );
  });
};

const gracefulShutdown = async (signal) => {
  console.log(`\n[SHUTDOWN] ${signal} signal received. Closing HTTP server...`);
  if (server) {
    server.close(() => {
      console.log("[SHUTDOWN] HTTP server closed.");
      process.exit(0);
    });
  } else {
    process.exit(0);
  }
};

process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
process.on("SIGINT", () => gracefulShutdown("SIGINT"));

process.on("unhandledRejection", (reason) => {
  console.error("[FATAL] Unhandled Promise Rejection:", reason);
  process.exit(1);
});

startServer();
