/*
  Warnings:

  - You are about to drop the `smister_ragistration` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "smister_ragistration";

-- CreateTable
CREATE TABLE "semester_ragistration" (
    "id" TEXT NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3) NOT NULL,
    "status" "Status" NOT NULL,
    "min_credit" INTEGER NOT NULL,
    "max_credit" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "semester_ragistration_pkey" PRIMARY KEY ("id")
);
