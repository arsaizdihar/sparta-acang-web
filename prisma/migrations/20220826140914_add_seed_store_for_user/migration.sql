-- CreateTable
CREATE TABLE "StoredUser" (
    "email" TEXT NOT NULL,
    "milestoneGroup" INTEGER NOT NULL,

    CONSTRAINT "StoredUser_pkey" PRIMARY KEY ("email")
);
