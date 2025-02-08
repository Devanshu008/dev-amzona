

import data from '@/lib/data'
import { db } from '@/lib/db'


const seed = async () => {
  try {
    const { products } = data


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