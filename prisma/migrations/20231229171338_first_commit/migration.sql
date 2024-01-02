-- CreateTable
CREATE TABLE "TeacherActivity" (
    "teacher_id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT NOT NULL DEFAULT 'https://i.imgur.com/1234567.png',
    "last_active" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "activity_score" INTEGER NOT NULL,
    "student_interaction_rating" DOUBLE PRECISION NOT NULL,
    "subjects_taught" TEXT[],

    CONSTRAINT "TeacherActivity_pkey" PRIMARY KEY ("teacher_id")
);

-- CreateTable
CREATE TABLE "StudentProgress" (
    "class_id" INTEGER NOT NULL,
    "subject" TEXT NOT NULL,
    "average_score_improvement" INTEGER NOT NULL,
    "homework_completion_rate" INTEGER NOT NULL,
    "attendance_rate" INTEGER NOT NULL,

    CONSTRAINT "StudentProgress_pkey" PRIMARY KEY ("class_id")
);

-- CreateTable
CREATE TABLE "ResourceManagement" (
    "resource_id" INTEGER NOT NULL,
    "resource_name" TEXT NOT NULL,
    "allocated_teachers" INTEGER[],
    "utilization_rate" INTEGER NOT NULL,

    CONSTRAINT "ResourceManagement_pkey" PRIMARY KEY ("resource_id")
);

-- CreateTable
CREATE TABLE "CoachDetail" (
    "coach_id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT NOT NULL DEFAULT 'https://i.imgur.com/1234567.png',
    "specialization" TEXT NOT NULL,
    "years_of_experience" INTEGER NOT NULL,

    CONSTRAINT "CoachDetail_pkey" PRIMARY KEY ("coach_id")
);

-- CreateTable
CREATE TABLE "CoachTeacherInteraction" (
    "id" SERIAL NOT NULL,
    "coach_id" INTEGER NOT NULL,
    "teacher_id" INTEGER NOT NULL,
    "last_meeting_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "meeting_notes" TEXT NOT NULL,

    CONSTRAINT "CoachTeacherInteraction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ResourceAllocation" (
    "teacher_id" INTEGER NOT NULL,
    "resource_id" INTEGER NOT NULL,

    CONSTRAINT "ResourceAllocation_pkey" PRIMARY KEY ("teacher_id","resource_id")
);

-- AddForeignKey
ALTER TABLE "CoachTeacherInteraction" ADD CONSTRAINT "CoachTeacherInteraction_coach_id_fkey" FOREIGN KEY ("coach_id") REFERENCES "CoachDetail"("coach_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CoachTeacherInteraction" ADD CONSTRAINT "CoachTeacherInteraction_teacher_id_fkey" FOREIGN KEY ("teacher_id") REFERENCES "TeacherActivity"("teacher_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResourceAllocation" ADD CONSTRAINT "ResourceAllocation_teacher_id_fkey" FOREIGN KEY ("teacher_id") REFERENCES "TeacherActivity"("teacher_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResourceAllocation" ADD CONSTRAINT "ResourceAllocation_resource_id_fkey" FOREIGN KEY ("resource_id") REFERENCES "ResourceManagement"("resource_id") ON DELETE RESTRICT ON UPDATE CASCADE;
