-- CreateEnum
CREATE TYPE "Status" AS ENUM ('UPCOMING', 'ONGOING', 'ENDED');

-- CreateTable
CREATE TABLE "courses_to_faculty" (
    "faculty_id" TEXT NOT NULL,
    "course_id" TEXT NOT NULL,

    CONSTRAINT "courses_to_faculty_pkey" PRIMARY KEY ("faculty_id","course_id")
);

-- CreateTable
CREATE TABLE "smister_ragistration" (
    "id" TEXT NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3) NOT NULL,
    "status" "Status" NOT NULL,
    "min_credit" INTEGER NOT NULL,
    "max_credit" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "smister_ragistration_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "courses_to_faculty" ADD CONSTRAINT "courses_to_faculty_faculty_id_fkey" FOREIGN KEY ("faculty_id") REFERENCES "faculties"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "courses_to_faculty" ADD CONSTRAINT "courses_to_faculty_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "courses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
