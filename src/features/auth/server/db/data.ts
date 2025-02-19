import bcrypt from 'bcryptjs'

import { IUserInput } from '@/features/auth/types'

enum UserRoleENUM {
  User = 'User',
  Admin = 'Admin',
}

const users: IUserInput[] = [
  {
    name: 'John',
    email: 'admin@example.com',
    password: bcrypt.hashSync('123456', 5),
    role: UserRoleENUM.Admin,
    address: {
      fullName: 'John Doe',
      street: '111 Main St',
      city: 'New York',
      province: 'NY',
      postalCode: '10001',
      country: 'USA',
      phone: '123-456-7890',
    },
    paymentMethod: 'Stripe',
    image: 'https://i.pravatar.cc/300',
  },
  {
    name: 'Dev',
    email: 'dev@example.com',
    password: bcrypt.hashSync('123456', 5),
    role: UserRoleENUM.User,
    address: {
      fullName: 'John Doe',
      street: '111 Main St',
      city: 'New York',
      province: 'NY',
      postalCode: '10001',
      country: 'USA',
      phone: '123-456-7890',
    },
    paymentMethod: 'Stripe',
    image: 'https://i.pravatar.cc/300',
  },
]

export default users
