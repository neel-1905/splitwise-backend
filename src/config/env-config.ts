import dotenv from "dotenv";

dotenv.config();

type EnvConfig = {
  port: number;
  nodeEnv: "development" | "production" | "test";
  jwtSecret: string;
};

const config: EnvConfig = {
  port: Number(process.env.PORT) || 4000,
  nodeEnv: (process.env.NODE_ENV as EnvConfig["nodeEnv"]) || "development",
  jwtSecret: process.env.JWT_SECRET!,
};

export default config;
