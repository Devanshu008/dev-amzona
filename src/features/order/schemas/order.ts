import { z } from 'zod'

import { MongoId, Price } from '@/lib/validator'

// Order Item
export const OrderItemSchema = z.object({
  clientId: z.string().min(1, 'clientId is required'),
  product: z.string().min(1, 'Product is required'),
  name: z.string().min(1, 'Name is required'),
  slug: z.string().min(1, 'Slug is required'),
  category: z.string().min(1, 'Category is required'),
  quantity: z
    .number()
    .int()
    .nonnegative('Quantity must be a non-negative number'),
  countInStock: z
    .number()
    .int()
    .nonnegative('Quantity must be a non-negative number'),
  image: z.string().min(1, 'Image is required'),
  price: Price('Price'),
  size: z.string().optional(),
  color: z.string().optional(),
})
export const ShippingAddressSchema = z.object({
  fullName: z.string().min(1, 'Full name is required'),
  street: z.string().min(1, 'Address is required'),
  city: z.string().min(1, 'City is required'),
  postalCode: z.string().min(1, 'Postal code is required'),
  province: z.string().min(1, 'Province is required'),
  phone: z.string().min(1, 'Phone number is required'),
  country: z.string().min(1, 'Country is required'),
})

// Order
export const OrderInputSchema = z.object({
  user: z.union([
    MongoId,
    z.object({
      name: z.string(),
      email: z.string().email(),
    }),
  ]),
  items: z
    .array(OrderItemSchema)
    .min(1, 'Order must contain at least one item'),
  shippingAddress: ShippingAddressSchema,
  paymentMethod: z.string().min(1, 'Payment method is required'),
  paymentResult: z
    .object({
      id: z.string(),
      status: z.string(),
      email_address: z.string(),
      pricePaid: z.string(),
    })
    .optional(),
  itemsPrice: Price('Items price'),
  shippingPrice: Price('Shipping price'),
  taxPrice: Price('Tax price'),
  totalPrice: Price('Total price'),
  expectedDeliveryDate: z
    .date()
    .refine(
      (value) => value > new Date(),
      'Expected delivery date must be in the future'
    ),
  isDelivered: z.boolean().default(false),
  deliveredAt: z.date().optional(),
  isPaid: z.boolean().default(false),
  paidAt: z.date().optional(),
})

// Cart
export const CartSchema = z.object({
  items: z
    .array(OrderItemSchema)
    .min(1, 'Order must contain at least one item'),
  itemsPrice: z.number(),
  taxPrice: z.optional(z.number()),
  shippingPrice: z.optional(z.number()),
  totalPrice: z.number(),
  paymentMethod: z.optional(z.string()),
  shippingAddress: z.optional(ShippingAddressSchema),
  deliveryDateIndex: z.optional(z.number()),
  expectedDeliveryDate: z.optional(z.date()),
})
