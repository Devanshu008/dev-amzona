import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatNumberWithDecimal = (num: number): string => {
  const [int, decimal] = num.toString().split('.')

  
return decimal ? `${int}.${decimal.padEnd(2, '0')}` : int
}

// PROMPT: [ChatGTP] create toSlug ts arrow function that convert text to lowercase, remove non-word,
// non-whitespace, non-hyphen characters, replace whitespace, trim leading hyphens and trim trailing hyphens

export const toSlug = (text: string): string =>
  text
    .toLowerCase()
    .replace(/[^\w\s-]+/g, '')
    .replace(/\s+/g, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/-+/g, '-')

const CURRENCY_FORMATTER = new Intl.NumberFormat('en-US', {
  currency: 'USD',
  style: 'currency',
  maximumFractionDigits: 2,
})

export const formatCurrency = (amount: number): string => CURRENCY_FORMATTER.format(amount)

const NUMBER_FORMATTER = new Intl.NumberFormat('en-US')

export const formatNumber = (amount: number): string => NUMBER_FORMATTER.format(amount)