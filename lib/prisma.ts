// /lib/prisma.ts
import { PrismaClient } from '@prisma/client'

let prisma: PrismaClient;

declare global {
  var prisma: PrismaClient;
}
console.log("in prisma file");
// console.log(process);
// console.log(process.env);
console.log(process.env.NODE_ENV);
console.log(1);
// console.log(new PrismaClient());
console.log(2);

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient()
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient()
  }
  prisma = global.prisma
}
console.log(3);
// console.log(prisma);
console.log(4);

// console.log(new PrismaClient());

export default prisma
