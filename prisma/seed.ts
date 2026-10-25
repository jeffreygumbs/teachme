import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import dashboardData from "../_data/dashboard_data.json" with { type: "json" };
import { PrismaClient } from "../lib/generated/prisma/client";
import type {
	CoachDetailUncheckedCreateInput,
	CoachTeacherInteractionUncheckedCreateInput,
	ResourceAllocationUncheckedCreateInput,
	ResourceManagementUncheckedCreateInput,
	StudentProgressUncheckedCreateInput,
	TeacherActivityUncheckedCreateInput,
} from "../lib/generated/prisma/models";

const teacher_activities =
	dashboardData.teacher_activities as unknown as TeacherActivityUncheckedCreateInput[];
const student_progress =
	dashboardData.student_progress as unknown as StudentProgressUncheckedCreateInput[];
const resource_management =
	dashboardData.resource_management as unknown as ResourceManagementUncheckedCreateInput[];
const coach_details =
	dashboardData.coach_details as unknown as CoachDetailUncheckedCreateInput[];
const coach_teacher_interactions =
	dashboardData.coach_teacher_interactions as unknown as CoachTeacherInteractionUncheckedCreateInput[];
const resource_allocation =
	dashboardData.resource_allocation as unknown as ResourceAllocationUncheckedCreateInput[];

const prisma = new PrismaClient({
	adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }),
});

async function main() {
	for (const item of teacher_activities) {
		await prisma.teacherActivity.create({
			data: {
				...item,
				last_active: item.last_active || new Date(),
			},
		});
	}
	for (const item of student_progress) {
		await prisma.studentProgress.create({
			data: item,
		});
	}
	for (const item of resource_management) {
		await prisma.resourceManagement.create({
			data: item,
		});
	}
	for (const item of coach_details) {
		await prisma.coachDetail.create({
			data: item,
		});
	}
	for (const item of coach_teacher_interactions) {
		await prisma.coachTeacherInteraction.create({
			data: {
				...item,
				last_meeting_date: item.last_meeting_date || new Date(),
			},
		});
	}
	for (const item of resource_allocation) {
		await prisma.resourceAllocation.create({
			data: {
				...item,
			},
		});
	}
}

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
