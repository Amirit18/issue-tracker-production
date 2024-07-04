'use client';

import {
  QueryClient,
  QueryClientProvider as ReactQueryClientProvider,
} from '@tanstack/react-query'
import { PropsWithChildren } from 'react'

const queryClinet = new QueryClient()

const QueryClientProvider = ({ children }: PropsWithChildren) => {
  return (
    <ReactQueryClientProvider client={queryClinet}>
      {children}
    </ReactQueryClientProvider>
  )
}

export default QueryClientProvider
