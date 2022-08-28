/*
  Warnings:

  - The primary key for the `Event` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `eventId` on the `KesanPesan` table. All the data in the column will be lost.
  - You are about to drop the column `eventId` on the `Participation` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId,eventSlug]` on the table `KesanPesan` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `eventSlug` to the `KesanPesan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `eventSlug` to the `Participation` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "KesanPesan" DROP CONSTRAINT "KesanPesan_eventId_fkey";

-- DropForeignKey
ALTER TABLE "Participation" DROP CONSTRAINT "Participation_eventId_fkey";

-- DropIndex
DROP INDEX "Event_slug_key";

-- DropIndex
DROP INDEX "KesanPesan_userId_eventId_key";

-- AlterTable
ALTER TABLE "Event" DROP CONSTRAINT "Event_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "Event_pkey" PRIMARY KEY ("slug");

-- AlterTable
ALTER TABLE "KesanPesan" DROP COLUMN "eventId",
ADD COLUMN     "eventSlug" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Participation" DROP COLUMN "eventId",
ADD COLUMN     "eventSlug" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "KesanPesan_userId_eventSlug_key" ON "KesanPesan"("userId", "eventSlug");

-- AddForeignKey
ALTER TABLE "Participation" ADD CONSTRAINT "Participation_eventSlug_fkey" FOREIGN KEY ("eventSlug") REFERENCES "Event"("slug") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "KesanPesan" ADD CONSTRAINT "KesanPesan_eventSlug_fkey" FOREIGN KEY ("eventSlug") REFERENCES "Event"("slug") ON DELETE CASCADE ON UPDATE CASCADE;
