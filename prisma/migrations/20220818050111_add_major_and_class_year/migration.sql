/*
  Warnings:

  - Added the required column `classYear` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `major` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Major" AS ENUM ('IF', 'STI');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "classYear" INTEGER NOT NULL,
ADD COLUMN     "major" "Major" NOT NULL;
