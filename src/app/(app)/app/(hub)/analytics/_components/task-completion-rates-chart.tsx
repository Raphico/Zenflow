"use client"

import { type getTaskCompletionRates } from "@/server/data/analytics"
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
  data: Awaited<ReturnType<typeof getTaskCompletionRates>>
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
