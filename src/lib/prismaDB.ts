import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
}

const prisma =
  globalThis.prisma ||
  new PrismaClient({
    transactional: false,
  });
if (process.env.NODE_ENV !== "production") globalThis.prisma = prisma;

export default prisma;
