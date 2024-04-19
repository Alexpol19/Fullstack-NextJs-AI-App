import { redirect } from "next/navigation";
import Editor from "../../../../components/Editor"
import { getUserByClerkId } from "../../../../utils/auth";
import { prisma } from "../../../../utils/db";
import { analyze } from "../../../../utils/ai";

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
  })

  await analyze("Feeling utterly drained and frustrated today, every task seems like an insurmountable challenge, and even the simplest interactions feel like a burden. It's as if a dark cloud is hovering over me, suffocating any semblance of positivity.")

  return entry
}

const JournalEditorPage = async ({params}: {params : { id: string}}) => {
  const entry = await getEntry(params.id)
  if(!entry) redirect('/journal')

  const analysisData = [
    {
      name: 'Summary',
      value: '',
    },
    {
      name: 'Subject',
      value: '',
    },
    {
      name: 'Mood',
      value: '',
    },
    {
      name: 'Negative',
      value: 'False',
    },
  ]
  return (
    <div className="h-full w-full grid grid-cols-3">
      <div className="col-span-2">
        <Editor entry={entry} />
      </div>
      <div className="border-l border-black/10">
        <div className="bg-blue-300 px-6 py-10">
          <h2 className="text-2xl">Analysis</h2>
        </div>
        <div>
          <ul>
            {analysisData.map(item => (
              <li key={item.name} className="px-2 py-4 flex items-center justify-between border-b border-t border-black/10">
                <span className="text-lg font-semibold">{item.name}</span>
                <span>{item.value}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default JournalEditorPage