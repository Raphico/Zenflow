import type { Board, Status, Task } from "@/db/schema"
import type { SubTask } from "@/lib/validations/task"
import { create } from "zustand"

export type ModalType =
  | "addColumn"
  | "addTask"
  | "createBoard"
  | "deleteBoard"
  | "deleteColumn"
  | "deleteTask"
  | "editTask"
  | "editBoard"
  | "editColumn"

type ModalData = {
  boarId?: number
  userId?: string
  currentStatus?: number
  availableStatuses?: Pick<Status, "id" | "title">[]
  board?: Pick<Board, "id" | "name">
  status?: Pick<Status, "id" | "title">
  task: Task
  subtasks: SubTask[]
}

type ModalStore = {
  type: ModalType | null
  data: ModalData | null
  isOpen: boolean
  onOpen: (type: ModalType, data: ModalData | null) => void
  onClose: () => void
}

export const useModalStore = create<ModalStore>((set) => ({
  type: null,
  data: null,
  isOpen: false,
  onOpen: (type, data = null) => set({ isOpen: true, type, data }),
  onClose: () => ({ type: null, isOpen: false }),
}))
