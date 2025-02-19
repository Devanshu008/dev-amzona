
import { db } from '@/db'
import users from '@/features/auth/server/db/data'


const seed = async () => {
  try {
    const createdUsers = await db.user.createMany({
      data: users,
    })

    console.log(`Created ${createdUsers.count} users.`)

    process.exit(0)
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}

seed().finally(async () => {
  await db.$disconnect()
})
