import { redirect } from "next/navigation";
import { getUserByClerkId } from "../../../utils/auth";
import { prisma } from "../../../utils/db";
import HistoryChart from "../../../components/HistoryChart";

const getData = async () => {
  const user = await getUserByClerkId()
  if(!user) return null;
  const analysis = await prisma.analysis.findMany({
    where: {
      userId: user.id
    },
    orderBy: {
      createdAt: 'asc'
    }
  })

  const total = analysis.reduce((acc, curr) => {
    return acc + curr.sentimentScore
  }, 0)
  const average = (total / analysis.length).toFixed(2)
  return { analysis, average }
}

const HistoryPage = async () => {
  const { analysis, average } = await getData() || {};

  return (
    <div className="h-full px-6 py-8">
      <div>
        <h1 className="text-2xl mb-4">{`Avg. Sentiment: ${average}`}</h1>
      </div>
      <div className="h-full w-full">
        {analysis && <HistoryChart data={analysis} />}
      </div>
    </div>
  )
}

export default HistoryPage