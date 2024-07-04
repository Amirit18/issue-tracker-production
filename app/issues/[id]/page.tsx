import prisma from '@/prisma/client'
import { Box, Flex, Grid } from '@radix-ui/themes'
import { notFound } from 'next/navigation'
import EditIssueButton from './EditIssueButton'
import IssueDetails from './IssueDetails'
import DeleteIssueButton from './DeleteIssueButton'
import { auth } from '@/auth'
import AssigneeSelect from './AssigneeSelect'
import { cache } from 'react'

const fetchUser = cache((issueId: number) =>
  prisma.issue.findUnique({ where: { id: issueId } })
)

interface Props {
  params: { id: string }
}

const IssueDetailPage = async ({ params }: Props) => {
  const session = await auth()
  const issue = await fetchUser(parseInt(params.id))
  if (!issue) notFound()

  return (
    <Grid columns={{ initial: '1', md: '5' }} gap="5">
      <Box className="lg:col-span-4">
        <IssueDetails issue={issue} />
      </Box>
      {session && (
        <Box>
          <Flex direction="column" gap="4">
            <AssigneeSelect issue={issue} />
            <EditIssueButton issueId={issue.id} />
            <DeleteIssueButton issueId={issue.id} />
          </Flex>
        </Box>
      )}
    </Grid>
  )
}

export default IssueDetailPage

export async function generateMetadata({ params }: Props) {
  const issue = await fetchUser(parseInt(params.id))

  return {
    title: `Issue ${issue?.id}`,
    description: `Details of  ${issue?.id}`,
  }
}

// export async function generateMetadata({ params }: Props) {
//   const issueId = parseInt(params.id);

//   if (isNaN(issueId)) {
//     console.error('Invalid issue ID:', params.id);
//     return {
//       title: 'Invalid Issue',
//       description: 'The issue ID provided is invalid.',
//     };
//   }

//   const issue = await prisma.issue.findUnique({
//     where: { id: issueId },
//   });

//   if (!issue) {
//     console.error('Issue not found for ID:', issueId);
//     return {
//       title: 'Issue Not Found',
//       description: `No details found for issue ID ${issueId}.`,
//     };
//   }

//   return {
//     title: `Issue ${issue.id}`,
//     description: `Details of issue ${issue.id}`,
//   };
// } // more advanced one
