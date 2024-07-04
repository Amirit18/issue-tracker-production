import { Status } from '@prisma/client'
import { Card, Flex, Text } from '@radix-ui/themes'
import Link from 'next/link'
import React from 'react'

interface Props {
  open: number
  inProgress: number
  closed: number
}

const IssueSummary = ({ open, inProgress, closed }: Props) => {
  const containers: {
    label: string
    value: number
    status: Status
  }[] = [
    { label: 'Open Issues', value: open, status: 'OPEN' },
    { label: 'In-progress Issues', value: inProgress, status: 'IN_PROGRESS' },
    { label: 'Closed Issues', value: closed, status: 'CLOSED' },
  ]

  return (
    <Flex gap='3'>
      {containers.map((container, index) => (
        <Card key={index}>
          <Flex direction='column'>
            <Link href={`/issues/list?status=${container.status}`} className='text-sm font-medium'>
              {container.label}
            </Link>
            <Text className='font-bold' size='5'>{container.value}</Text>
          </Flex>
        </Card>
      ))}
    </Flex>
  )
}

export default IssueSummary
