'use client'
import Link from 'next/link'

import { ChevronUp } from 'lucide-react'

import { Button } from '@/components/ui/button'

import { APP_NAME } from '@/lib/constants'

const Footer = () => {
  return (
    <footer className='bg-black  text-white underline-link'>
      <div className='w-full'>
        <Button
          variant='ghost'
          className='bg-gray-800 w-full  rounded-none '
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <ChevronUp className='mr-2 h-4 w-4' />
          Back to top
        </Button>
      </div>
      <div className='p-4'>
        <div className='flex justify-center  gap-3 text-sm'>
          <Link href='/page/conditions-of-use'>Condition of use</Link>
          <Link href='/page/privacy-policy'>Privacy notice</Link>
          <Link href='/page/help'>Help</Link>
        </div>
        <div className='flex justify-center text-sm'>
          <p>
            © {new Date().getFullYear()} {APP_NAME}. All Rights Reserved.
          </p>
        </div>
        <div className='mt-8 flex justify-center text-sm text-gray-400'>
          1234 Main St. Springfield, IL 62701 | 123-456-7890 | info@{APP_NAME}
          .com
        </div>
      </div>
    </footer>
  )
}

export default Footer
