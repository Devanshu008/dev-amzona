export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || 'DevAmzn'
export const APP_SLOGAN =
  process.env.NEXT_PUBLIC_APP_SLOGAN || 'Spend Less, Smile More.'
export const APP_DESCRIPTION =
  process.env.NEXT_PUBLIC_APP_DESCRIPTION ||
  'DevAmzn is a full-stack e-commerce application built with Next.js, Tailwind CSS, and Stripe.'

export const PAGE_SIZE = Number(process.env.NEXT_PAGE_SIZE || 9)

export const FREE_SHIPPING_MIN_PRICE = Number(
  process.env.NEXT_FREE_SHIPPING_MIN_PRICE || 35
)


export interface ApiResponse<T> {
  status: string
  message: string
  data?: T
  error?: string
}
