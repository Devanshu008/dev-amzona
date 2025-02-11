'use server'

import { PAGE_SIZE, ApiResponse } from '@/lib/constants'

import { IProductInput } from '@/features/products/types'
import { db } from '@/db'

interface GetRelatedProductsParams {
  category: string
  productId: string
  limit?: number
  page?: number
}

// ✅ Get all unique categories
export async function getAllCategories(): Promise<ApiResponse<string[]>> {
  try {
    const categories = await db.product.findMany({
      select: { category: true },
      distinct: ['category'],
    })

    return {
      status: 'success',
      message: 'Categories fetched successfully.',
      data: categories.map((category) => category.category),
    }
  } catch (error) {
    console.error('Error fetching categories:', error)

    return {
      status: 'error',
      message: 'Failed to fetch categories.',
      error: (error as Error).message,
    }
  }
}

// ✅ Get products for card based on tag
export async function getProductsForCard({
  tag,
  limit = 4,
}: {
  tag: string
  limit?: number
}): Promise<ApiResponse<{ name: string; href: string; image: string }[]>> {
  try {
    const products = await db.product.findMany({
      where: { tags: { hasSome: [tag] }, isPublished: true },
      select: { name: true, slug: true, images: true },
      take: limit,
      orderBy: { createdAt: 'desc' },
    })

    return {
      status: 'success',
      message: 'Products for card fetched successfully.',
      data: products.map((product) => ({
        name: product.name,
        href: `/product/${product.slug}`,
        image: product.images[0] || '', // Ensure there's always a string
      })),
    }
  } catch (error) {
    console.error('Error fetching products for card:', error)

    return {
      status: 'error',
      message: 'Failed to fetch products for card.',
      error: (error as Error).message,
    }
  }
}

// ✅ Get products by tag
export async function getProductsByTag({
  tag,
  limit = 10,
}: {
  tag: string
  limit?: number
}): Promise<ApiResponse<IProductInput[]>> {
  try {
    const products = await db.product.findMany({
      where: { tags: { hasSome: [tag] }, isPublished: true },
      take: limit,
      orderBy: { createdAt: 'desc' },
    })

    return {
      status: 'success',
      message: 'Products fetched successfully by tag.',
      data: products,
    }
  } catch (error) {
    console.error('Error fetching products by tag:', error)

    return {
      status: 'error',
      message: 'Failed to fetch products by tag.',
      error: (error as Error).message,
    }
  }
}

// ✅ Get One Product By Slug
export async function getOneProductBySlug(
  slug: string
): Promise<ApiResponse<IProductInput>> {
  try {
    if (!slug) {
      return { status: 'error', message: 'Slug is required.' }
    }

    const product = await db.product.findFirst({
      where: { slug, isPublished: true },
    })

    if (!product) {
      return { status: 'error', message: 'Product not found.' }
    }

    return {
      status: 'success',
      message: 'Product fetched successfully.',
      data: product,
    }
  } catch (error) {
    console.error('Error fetching product by slug:', error)

    return {
      status: 'error',
      message: 'Failed to fetch product by slug.',
      error: (error as Error).message,
    }
  }
}

// ✅ Get related products: products with the same category
export async function getRelatedProductsByCategory({
  category,
  productId,
  limit = PAGE_SIZE,
  page = 1,
}: GetRelatedProductsParams): Promise<
  ApiResponse<{
    products: IProductInput[]
    meta: {
      totalPages: number
      totalProducts: number
      currentPage: number
      nextPage: number | null
      prevPage: number | null
    }
  }>
> {
  try {
    // ✅ Validate input
    if (!category || !productId) {
      return {
        status: 'error',
        message: 'Category and Product ID are required.',
      }
    }

    const skip = (Number(page) - 1) * limit

    const conditions = {
      category: { equals: category },
      isPublished: true,
      NOT: { id: productId }, // Exclude the current product
    }

    // ✅ Fetch products and total count
    const [products, productsCount] = await Promise.all([
      db.product.findMany({
        where: conditions,
        take: limit,
        orderBy: { createdAt: 'desc' },
        skip,
      }),
      db.product.count({ where: conditions }),
    ])

    // ✅ Validate productsCount (Ensure it's a number)
    if (isNaN(productsCount)) {
      throw new Error('Invalid products count returned from database.')
    }

    // ✅ Calculate pagination
    const totalPages = Math.ceil(productsCount / limit)
    const hasNextPage = page < totalPages
    const hasPrevPage = page > 1

    return {
      status: 'success',
      message: 'Related products fetched successfully.',
      data: {
        products: products ?? [], // Ensure products is an array
        meta: {
          totalPages,
          totalProducts: productsCount,
          currentPage: page,
          nextPage: hasNextPage ? page + 1 : null,
          prevPage: hasPrevPage ? page - 1 : null,
        },
      },
    }
  } catch (error) {
    console.error('Error fetching related products:', error)

    return {
      status: 'error',
      message: 'Failed to fetch related products.',
      error: (error as Error).message,
    }
  }
}
