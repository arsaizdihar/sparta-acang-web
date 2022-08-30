/*
  Warnings:

  - You are about to drop the column `downvotesCount` on the `KesanPesan` table. All the data in the column will be lost.
  - You are about to drop the column `upvotesCount` on the `KesanPesan` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "KesanPesan" DROP COLUMN "downvotesCount",
DROP COLUMN "upvotesCount",
ADD COLUMN     "votesCount" INTEGER NOT NULL DEFAULT 0;

-- CreateIndex
CREATE INDEX "KesanPesan_votesCount_idx" ON "KesanPesan"("votesCount");
