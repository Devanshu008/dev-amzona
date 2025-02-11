

import { db } from '@/db'
import products from '@/features/products/server/db/data'

const seed = async () => {
  try {
    const createdProducts = await db.product.createMany({
        data: products
    })

    console.log(`Created ${createdProducts.count} products.`)

    process.exit(0)
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}

seed().finally(async () => {
  await db.$disconnect()
})