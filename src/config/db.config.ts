import dotenv from "dotenv";

dotenv.config();

type DBConfig = {
  url: string;
};

const dbConfig: DBConfig = {
  url: process.env.DATABASE_URL ?? "",
};

export default dbConfig;
