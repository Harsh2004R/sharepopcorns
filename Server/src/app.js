// app.js
import express from "express";
import helmet from "helmet";
import cors from "cors";
import dotenv from "dotenv";
import hpp from "hpp";
import rateLimit from "express-rate-limit";
import morgan from "morgan";
import routes from "./routes/index.js";
import compression from "compression";
import cookieParser from "cookie-parser";
import { errorHandler } from "./middlewares/error.middleware.js";
import { ApiError } from "./utils/ApiError.js";
import { HTTP_STATUS } from "./constants/httpStatusCodes.js";

const app = express();

dotenv.config();
app.use(helmet());
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.use(compression());
app.use(morgan("combined"));
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));
app.use(cookieParser());
app.use(hpp());

// Rate Limiter
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 200,
  }),
);

// Routes
app.get("/", (req, res) => {
  res.status(200).json({ message: "Server is live" });
});

app.use("/api/v1", routes);

// 404 Handler
app.use((req, res, next) => {
  next(
    new ApiError({
      statusCode: HTTP_STATUS.NOT_FOUND,
      message: `Cannot find ${req.originalUrl} on this server`,
      code: "ROUTE_NOT_FOUND",
    }),
  );
});

// Error middleware
app.use(errorHandler);

export default app;
