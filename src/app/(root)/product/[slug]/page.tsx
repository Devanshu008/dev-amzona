import ProductGallery from '@/components/shared/product/product-gallery'
import ProductPrice from '@/components/shared/product/product-price'
import ProductSlider from '@/components/shared/product/product-slider'
import Rating from '@/components/shared/product/rating'
import SelectVariant from '@/components/shared/product/select-variant'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import {
  getOneProductBySlug,
  getRelatedProductsByCategory,
} from '@/lib/actions/product.actions'
import { IProductInput } from '@/types'

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>
}) {
  try {
    const { slug } = await props.params
    const product = await getOneProductBySlug(slug)

    if (product.status === 'success') {
      return {
        title: product.data?.name,
        description: product.data?.description,
      }
    }
  } catch (error) {
    console.log(error)
    return {
      title: 'Product not found',
      description: 'Product not found',
    }
  }
}

const ProductDetails = async (props: {
  params: Promise<{ slug: string }>
  searchParams: Promise<{
    page?: string
    color?: string
    size?: string
  }>
}) => {
  const { color, size, page } = await props.searchParams

  const { slug } = await props.params

  const product = await getOneProductBySlug(slug)

  if (product.status === 'error') {
    return <div>Product not found</div>
  }

  const relatedProducts = await getRelatedProductsByCategory({
    category: product.data?.category ?? '',
    productId: product.data?.id ?? '',
    page: Number(page ?? 1),
  })

  const productData: IProductInput = product.data!

  return (
    <>
      <section>
        <div className='grid grid-cols-1 md:grid-cols-5'>
          <div className='col-span-2'>
            <ProductGallery images={productData.images ?? []} />
          </div>
          <div className='flex w-full flex-col gap-2 md:p-5 col-span-2'>
            <div className='flex flex-col gap-3'>
              <p className='p-medium-16 rounded-full bg-grey-500/10 text-grey-500'>
                Brand {productData.brand} {productData.category}
              </p>
              <h1 className='font-bold text-lg lg:text-xl'>
                {productData.name}
              </h1>

              <div className='flex items-center gap-2'>
                <span>{productData.avgRating.toFixed(1)}</span>
                <Rating rating={productData.avgRating} />
                <span>{productData.numReviews} rating</span>
              </div>

              <Separator />

              <div className='flex flex-col gap-3 sm:flex-row sm:items-center'>
                <div className='flex gap-3'>
                  <ProductPrice
                    price={productData.price}
                    listPrice={productData.listPrice}
                    isDeal={productData.tags.includes('todays-deal')}
                    forListing={false}
                  />
                </div>
              </div>
            </div>
            <div className=''>
              <SelectVariant
                color={color || productData.colors[0]}
                size={size || productData.sizes[0]}
                product={productData}
              />
            </div>
            <Separator className='my-2' />
            <div className='flex flex-col gap-2'>
              <p className='p-bold-20 text-grey-600'>Product Description</p>
              <p className='p-medium-16 lg:p-regular-18'>
                {productData.description}
              </p>
            </div>
          </div>
          <div>
            <Card>
              <CardContent className='p-4 flex flex-col  gap-4'>
                <ProductPrice price={productData.price} />
                {productData.countInStock > 0 &&
                  productData.countInStock <= 3 && (
                    <div className='text-destructive font-bold'>
                      {`Only ${productData.countInStock} left in stock - order soon`}
                    </div>
                  )}
                {productData.countInStock !== 0 ? (
                  <div className='text-green-700 text-xl'>In stock</div>
                ) : (
                  <div className='text-destructive text-xl'>Out of stock</div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className='mt-10'>
        <ProductSlider
          products={relatedProducts.data?.products ?? []}
          title={`Best Selling in ${productData.category}s`}
        />
      </section>
    </>
  )
}

export default ProductDetails
