"use client"

import { useMounted } from "@/hooks/use-mounted"

import { ResponsiveContainer, BarChart, XAxis, YAxis, Bar } from "recharts"

interface TaskDistributionByStatusChartProps {
  data: {
    title: string
    count: number
  }[]
}

export function TaskDistributionByStatusChart({
  data,
}: TaskDistributionByStatusChartProps) {
  const mounted = useMounted()

  if (mounted) {
    return (
      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={data}>
          <XAxis
            dataKey="title"
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
