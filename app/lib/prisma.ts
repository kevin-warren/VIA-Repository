// import { PrismaClient } from '@prisma/client';

// // Create a Prisma Client instance
// const prisma = new PrismaClient();

// export { prisma };

// lib/prisma.ts
import { PrismaClient } from "@prisma/client";

declare global {
  // Augment the global object with a custom PrismaClient property
  var prisma: PrismaClient | undefined;
}

let prisma: PrismaClient;

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
}

export default prisma;
