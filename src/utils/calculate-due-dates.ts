import {
  addDays,
  endOfMonth,
  endOfWeek,
  startOfMonth,
  startOfWeek,
} from "date-fns"

export function calculateDueDates(
  dueDateValue: string
): { endDate: Date; startDate: Date } | null {
  const today = new Date()

  switch (dueDateValue) {
    case "this.week":
      return { startDate: startOfWeek(today), endDate: endOfWeek(today) }
    case "next.7.days":
      return { startDate: today, endDate: addDays(today, 7) }
    case "this.month":
      return { startDate: startOfMonth(today), endDate: endOfMonth(today) }
    default:
      return null // For 'All (default)' and any other unsupported values
  }
}
