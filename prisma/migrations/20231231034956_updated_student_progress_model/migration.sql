-- AlterTable
CREATE SEQUENCE studentprogress_class_id_seq;
ALTER TABLE "StudentProgress" ALTER COLUMN "class_id" SET DEFAULT nextval('studentprogress_class_id_seq');
ALTER SEQUENCE studentprogress_class_id_seq OWNED BY "StudentProgress"."class_id";
