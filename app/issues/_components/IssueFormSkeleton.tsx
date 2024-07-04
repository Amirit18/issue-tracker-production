import { Box } from '@radix-ui/themes'
import React from 'react'
import { Skeleton } from '@/app/components'

const IssueFormSkeleton = () => {
  return (
    <div>
      <Box className="max-w-xl">
        <Skeleton height="2rem" />
        <Skeleton height="22rem" />
      </Box>
    </div>
  )
}

export default IssueFormSkeleton
