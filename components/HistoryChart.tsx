'use client'
import { Analysis } from '@prisma/client';
import { ResponsiveContainer, LineChart, Line, XAxis, Tooltip } from 'recharts'

const dateFormatter = (date: string) => {
  return new Date(date).toLocaleString('en-us', {
    weekday: 'long',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  })
};

type CustomTooltipProps = {
  payload?: [
    {
      payload: Analysis
    }
  ],
  label?: string,
  active?: boolean,
}

const CustomTooltip = ({ payload, label, active }: CustomTooltipProps) => {
  if(!payload || !label) return null;
  const dateLabel = dateFormatter(label)

  if (active) {
    const analysis = payload[0].payload
    return (
      <div className="p-8 custom-tooltip bg-white/5 shadow-md border border-black/10 rounded-lg backdrop-blur-md relative">
        <div
          className="absolute left-2 top-2 w-2 h-2 rounded-full"
          style={{ background: analysis.color }}
        ></div>
        <p className="label text-sm text-black/30">{dateLabel}</p>
        <p className="intro text-xl uppercase">{analysis.mood}</p>
      </div>
    )
  }

  return null
}

type HistoryChartProps = {
  data: Analysis[];
}

const HistoryChart = ({ data }: HistoryChartProps) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart width={300} height={100} data={data}>
        <Line
          type="monotone"
          dataKey="sentimentScore"
          stroke="#8884d8"
          strokeWidth={2}
          activeDot={{ r: 8 }}
        />
        <XAxis
          dataKey="createdAt"
          tickFormatter={dateFormatter}
        />
        <Tooltip content={<CustomTooltip />} />
      </LineChart>
    </ResponsiveContainer>
  )
}

export default HistoryChart