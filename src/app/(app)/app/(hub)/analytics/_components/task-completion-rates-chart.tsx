"use client"

import { format } from "date-fns"
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

interface TaskCompletionRatesChartProps {
  data: {
    createdAt: Date
    completedTasks: number
  }[]
}

export function TaskCompletionRatesChart({
  data,
}: TaskCompletionRatesChartProps) {
  const formattedData = data.map((rate) => ({
    "Date Created": format(rate.createdAt, "MMM d"),
    "Completed Tasks": rate.completedTasks,
  }))

  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart data={formattedData}>
        <XAxis dataKey="Date Created" hide />
        <YAxis hide />
        <Tooltip
          contentStyle={{
            background: "hsl(var(--background ))",
            border: "1px hsl(var(--border)) solid",
          }}
        />
        <Line
          type="monotone"
          dataKey="Completed Tasks"
          stroke="hsl(var(--foreground))"
        />
      </LineChart>
    </ResponsiveContainer>
  )
}
