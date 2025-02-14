import {
  BaseQueryFn,
  fetchBaseQuery,
  FetchBaseQueryError
} from '@reduxjs/toolkit/query/react'

// import { RootState } from '../store'
// import { resetAuth } from './slices/authSlice'

let isHandling401 = false

interface BaseQueryOptions {
  baseUrl?: string
  authCheck?: boolean
  timeout?: number
}

const createBaseQueryWithReAuth = ({
  baseUrl = process.env.NEXT_PUBLIC_BASE_URL || '',
  authCheck = true,
  timeout = 5000,
}: BaseQueryOptions = {}): BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> => {
  const baseQuery = fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers, { getState }) => {
      //   const token = (getState() as RootState).auth?.token

      //   if (authCheck && token) headers.set('Authorization', `Bearer ${token}`)

      return headers
    },
    fetchFn: async (input: RequestInfo, init?: RequestInit) => {
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), timeout)

      try {
        return await fetch(input, { ...init, signal: controller.signal })
      } catch (error) {
        if (error instanceof DOMException && error.name === 'AbortError') {
          return new Response(null, {
            status: 408,
            statusText: 'Request Timeout',
          })
        }

        throw error
      } finally {
        clearTimeout(timeoutId)
      }
    },
  })

  return async (args, api, extraOptions) => {
    const result = await baseQuery(args, api, extraOptions)

    if (result.error?.status === 401 && !isHandling401) {
      isHandling401 = true

      //   api.dispatch(resetAuth())
      localStorage.clear()
      setTimeout(() => (isHandling401 = false), 3000)
      location.replace('/login')

      return { ...result, error: undefined }
    }

    if (result.error?.status === 408) {
      return {
        error: {
          status: 'FETCH_ERROR',
          error: 'Request timed out. Please try again.',
        },
      }
    }

    return result
  }
}

export default createBaseQueryWithReAuth

type FetchArgs = {
  url: string
  method?: string
  body?: any
  headers?: HeadersInit
}
