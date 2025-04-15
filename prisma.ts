import { PrismaClient } from "@/lib/generated/prisma";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const connectionString = `${process.env.DATABASE_URL}`;

// Cast the pool to any to work around the type incompatibility
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool as any);
export const prisma = new PrismaClient({ adapter });
