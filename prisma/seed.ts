import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function cleanupDb(prisma: PrismaClient) {
	const tables = await prisma.$queryRaw<
		{ name: string }[]
	>`SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%' AND name NOT LIKE '_prisma_migrations';`

	try {
		// Disable FK constraints to avoid relation conflicts during deletion
		await prisma.$executeRawUnsafe(`PRAGMA foreign_keys = OFF`)
		await prisma.$transaction([
			// Delete all rows from each table, preserving table structures
			...tables.map(({ name }) =>
				prisma.$executeRawUnsafe(`DELETE from "${name}"`),
			),
		])
	} catch (error) {
		console.error('Error cleaning up database:', error)
	} finally {
		await prisma.$executeRawUnsafe(`PRAGMA foreign_keys = ON`)
	}
}


async function main() {
    await cleanupDb(prisma);

    const users = [
        {
            username: "SubIT",
            email: "subit@i.pkuschool.edu.cn",
            imageUrl: "https://i.postimg.cc/xj63ZDgT/1712898145274-dbb8fc5e-f983-4b26-b867-4055c273f591-1.webp",
        }
    ];
    
    for (const user of users) {
        const u = await prisma.user.create({
            data: {
                username: user.username,
                email: user.email,
                imageUrl: user.imageUrl,
                tracks: {
                    create: [
                        {
                            track: {
                                create: {
                                    trackName: "test track",
                                    trackIntro: "a test track",
                                    startTime: new Date(1971, 0, 1, 0, 0, 0),
                                    endTime: new Date(2026, 0, 1, 0, 0, 0),
                                    imageUrl: "https://i.postimg.cc/xj63ZDgT/1712898145274-dbb8fc5e-f983-4b26-b867-4055c273f591-1.webp"
                                }
                            }
                        }
                    ]
                }
            }
        });
        console.log(`Created user with id: ${u.id}`);
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