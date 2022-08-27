/*
  Warnings:

  - You are about to drop the column `quota` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `participationId` on the `User` table. All the data in the column will be lost.
  - Added the required column `quota19` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quota20` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quota21` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Event" DROP COLUMN "quota",
ADD COLUMN     "quota19" INTEGER NOT NULL,
ADD COLUMN     "quota20" INTEGER NOT NULL,
ADD COLUMN     "quota21" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "participationId";
