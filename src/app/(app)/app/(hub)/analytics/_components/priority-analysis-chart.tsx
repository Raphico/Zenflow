"use client"

import { type getPriorityAnalysis } from "@/server/data/analytics"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

import { useMounted } from "@/hooks/use-mounted"

interface PriorityAnalysisChartProps {
  data: Awaited<ReturnType<typeof getPriorityAnalysis>>
}

export function PriorityAnalysisChart({ data }: PriorityAnalysisChartProps) {
  const mounted = useMounted()

  if (mounted) {
    return (
      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={data}>
          <XAxis
            dataKey="priority"
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
            hide={window.innerWidth < 600}
            tickLine={false}
            axisLine={false}
          />
          <Bar
            dataKey="count"
            stackId="a"
            fill="hsl(var(--foreground))"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    )
  }
}
