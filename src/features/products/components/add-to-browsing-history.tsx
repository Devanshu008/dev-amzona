'use client'
import { useEffect } from 'react'

import { useAppDispatch } from '@/store/hook'
import { addItem } from '@/store/slices/browsing-history-slice'

export default function AddToBrowsingHistory({
  id,
  category,
}: {
  id: string
  category: string[]
}) {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(addItem({ id, category }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return null
}
