-- AlterTable
ALTER TABLE "KesanPesan" ADD COLUMN     "downvotesCount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "upvotesCount" INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "_upvotes" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_downvotes" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_upvotes_AB_unique" ON "_upvotes"("A", "B");

-- CreateIndex
CREATE INDEX "_upvotes_B_index" ON "_upvotes"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_downvotes_AB_unique" ON "_downvotes"("A", "B");

-- CreateIndex
CREATE INDEX "_downvotes_B_index" ON "_downvotes"("B");

-- AddForeignKey
ALTER TABLE "_upvotes" ADD CONSTRAINT "_upvotes_A_fkey" FOREIGN KEY ("A") REFERENCES "KesanPesan"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_upvotes" ADD CONSTRAINT "_upvotes_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_downvotes" ADD CONSTRAINT "_downvotes_A_fkey" FOREIGN KEY ("A") REFERENCES "KesanPesan"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_downvotes" ADD CONSTRAINT "_downvotes_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
