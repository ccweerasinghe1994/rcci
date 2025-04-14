import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import { PrismaClient } from "../lib/generated/prisma";
// PrismaClient is attached to the `global` object in development to prevent
// exhausting your database connection limit.

const connectionString = `${process.env.DATABASE_URL}`;

const globalForPrisma = global as unknown as {
  prisma: PrismaClient;
};

const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool, {
  schema: "rcciSchema",
});
// Create a new client instance that uses DATABASE_URL environment variable
export const prisma = globalForPrisma.prisma || new PrismaClient({ adapter });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

export default prisma;
