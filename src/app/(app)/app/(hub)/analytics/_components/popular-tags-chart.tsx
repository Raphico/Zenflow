"use client"

import { type getPopularTags } from "@/server/data/analytics"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

import { useMounted } from "@/hooks/use-mounted"

interface PopularTagsChartProps {
  data: Awaited<ReturnType<typeof getPopularTags>>
}

export function PopularTagsChart({ data }: PopularTagsChartProps) {
  const mounted = useMounted()

  const filteredData = data
    .filter(({ tag }) => tag)
    .map(({ tag, count }) => ({ label: tag, value: count }))

  if (mounted) {
    return (
      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={filteredData}>
          <XAxis
            dataKey="label"
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
            dataKey="value"
            fill="hsl(var(--foreground))"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    )
  }
}
