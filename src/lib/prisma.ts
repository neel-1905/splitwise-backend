import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import dbConfig from "../config/db.config";
import { PrismaClient } from "@prisma/client/extension";

const connectionString = dbConfig.url;

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

export { prisma };
