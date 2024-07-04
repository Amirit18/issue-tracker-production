'use client';

import { Status } from '@prisma/client'
import { Select } from '@radix-ui/themes'
import { useRouter, useSearchParams } from 'next/navigation'

const IssueStatusFilter = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const statuses: { label: string; value?: Status }[] = [
    { label: 'All' },
    { label: 'Open', value: 'OPEN' },
    { label: 'In Progress', value: 'IN_PROGRESS' },
    { label: 'Closed', value: 'CLOSED' },
  ]

  return (
    <Select.Root
    defaultValue={searchParams.get('status') || 'none'}
    onValueChange={(status) => {
        const params = new URLSearchParams();
        if (status && status !== 'none')
          params.append('status', status)
        if (searchParams.get('orderBy'))
          params.append('orderBy', searchParams.get('orderBy')!)
        const query = params.size ? '?' + params.toString() : ''
        router.push('/issues/list' + query)
      }}
    >
      <Select.Trigger placeholder="Filter by status..." />
      <Select.Content>
        {statuses.map((status, index) => (
          <Select.Item key={index} value={status.value || 'none'}>
            {status.label}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  )
}

export default IssueStatusFilter
