import { redirect } from "next/navigation";
import Editor from "../../../../components/Editor"
import { getUserByClerkId } from "../../../../utils/auth";
import { prisma } from "../../../../utils/db";

const getEntry = async (entryId: string) => {
  const user = await getUserByClerkId()
  if(!user) return null;

  const entry = await prisma.journalEntry.findUnique({
    where: {
      userId_id: {
        userId: user.id,
        id: entryId
      }
    },
    include: {
      analysis: true
    }
  })

  return entry
}

const JournalEditorPage = async ({params}: {params : { id: string}}) => {
  const entry = await getEntry(params.id)
  if(!entry) redirect('/journal')

  return (
    <div className="h-full w-full grid grid-cols-3">
      <Editor entry={entry} />
    </div>
  )
}

export default JournalEditorPage