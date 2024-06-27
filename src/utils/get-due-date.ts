import { format, isThisWeek, isToday, isTomorrow } from "date-fns"

export function getDueDate(dueDate: Date) {
  if (isToday(dueDate)) {
    return "Due today"
  } else if (isTomorrow(dueDate)) {
    return "Due tomorrow"
  } else if (isThisWeek(dueDate)) {
    return `Due on ${format(dueDate, "EEEE")}`
  } else {
    return `Due on ${format(dueDate, "MMM d")}`
  }
}
