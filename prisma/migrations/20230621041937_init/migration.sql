-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "email" TEXT,
    "image" TEXT,
    "role" "Role" NOT NULL DEFAULT 'USER',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "chuck_norris_post" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "icon_url" TEXT NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "chuck_norris_post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_UserTochuck_norris_post" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "_UserTochuck_norris_post_AB_unique" ON "_UserTochuck_norris_post"("A", "B");

-- CreateIndex
CREATE INDEX "_UserTochuck_norris_post_B_index" ON "_UserTochuck_norris_post"("B");

-- AddForeignKey
ALTER TABLE "_UserTochuck_norris_post" ADD CONSTRAINT "_UserTochuck_norris_post_A_fkey" FOREIGN KEY ("A") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserTochuck_norris_post" ADD CONSTRAINT "_UserTochuck_norris_post_B_fkey" FOREIGN KEY ("B") REFERENCES "chuck_norris_post"("id") ON DELETE CASCADE ON UPDATE CASCADE;
