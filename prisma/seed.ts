const { PrismaClient } = require("@prisma/client");
const {
	teacher_activities,
	student_progress,
	resource_management,
	coach_details,
	coach_teacher_interactions,
	resource_allocation,
} = require("../_data/dashboard_data.json");

const prisma = new PrismaClient();

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
		await prisma.ResourceAllocation.create({
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
