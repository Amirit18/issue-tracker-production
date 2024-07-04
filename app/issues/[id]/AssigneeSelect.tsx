'use client'

import { Issue, User } from '@prisma/client'
import { Select } from '@radix-ui/themes'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { Skeleton } from '@/app/components'
import toast, { Toaster } from 'react-hot-toast'

const AssigneeSelect = ({ issue }: { issue: Issue }) => {
  // const users = await prisma.user.findMany({ orderBy: { name: 'asc' } }) //for using without use client
  const {
    data: users,
    error,
    isLoading,
  } = useUsers();

  const assignIssue = (userId: string) => {
    axios.patch(`/api/issues/${issue.id}`, {
      assignedToUserId: userId === 'none' ? null : userId,
    }).catch(() => {
      toast.error('Changes cannot be saved.')
    })
  }

  if (isLoading) return <Skeleton />
  if (error) return null
  return (
    <>
      <Select.Root
        defaultValue={issue.assignedToUserId || 'none'}
        onValueChange={assignIssue}
      >
        <Select.Trigger placeholder="Assign..." />
        <Select.Content>
          <Select.Group>
            <Select.Label>Suggestions</Select.Label>
            <Select.Item value="none">Unassigned</Select.Item>
            {users?.map((user) => (
              <Select.Item key={user.id} value={user.id}>
                {user.name}
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>
      <Toaster />
    </>
  )
}

const useUsers = () => useQuery<User[]>({
  queryKey: ['users'],
  queryFn: () => axios.get('/api/users').then((res) => res.data),
  staleTime: 60 * 1000 * 3600, //1h
  retry: 3,
});

export default AssigneeSelect
