-- CreateTable
CREATE TABLE "KesanPesan" (
    "userId" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "text" TEXT NOT NULL,

    CONSTRAINT "KesanPesan_pkey" PRIMARY KEY ("userId")
);

-- CreateIndex
CREATE INDEX "KesanPesan_createdAt_idx" ON "KesanPesan"("createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "KesanPesan_userId_eventId_key" ON "KesanPesan"("userId", "eventId");

-- CreateIndex
CREATE INDEX "Participation_createdAt_idx" ON "Participation"("createdAt");

-- AddForeignKey
ALTER TABLE "KesanPesan" ADD CONSTRAINT "KesanPesan_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "KesanPesan" ADD CONSTRAINT "KesanPesan_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;
