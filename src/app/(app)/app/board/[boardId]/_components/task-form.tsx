import type { Status } from "@/db/schema"
import { format } from "date-fns"
import { useFieldArray, type UseFormReturn } from "react-hook-form"
import TextareaAutosize from "react-textarea-autosize"
import type { z } from "zod"

import { cn } from "@/lib/utils"
import type { SubTask, taskSchema } from "@/lib/validations/task"
import { Button, buttonVariants } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Icons } from "@/components/icons"

type Inputs = z.infer<typeof taskSchema>

interface TaskFormProps {
  type: "Create" | "Update"
  isPending: boolean
  onSubmit: (data: Inputs) => void
  form: UseFormReturn<
    {
      title: string
      priority: "P1" | "P2" | "P3" | "P4"
      statusId: number
      subtasks: SubTask[]
      description?: string | undefined
      dueDate?: Date | undefined
      tag?: string | undefined
    },
    unknown,
    undefined
  >
  availableStatuses: Pick<Status, "id" | "title">[]
}

export function TaskForm({
  isPending,
  onSubmit,
  form,
  type,
  availableStatuses,
}: TaskFormProps) {
  const subtasksFieldArray = useFieldArray({
    control: form.control,
    name: "subtasks",
  })

  return (
    <Form {...form}>
      <form className="grid gap-2" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <TextareaAutosize
                  className="w-full resize-none border-none bg-transparent text-2xl font-bold outline-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="dueDate"
          render={({ field }) => (
            <FormItem className="flex w-full items-center gap-8">
              <FormLabel className="text-nowrap text-muted-foreground">
                Due Date
              </FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="ghost"
                      className="flex w-full justify-start font-normal"
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span className="flex items-center text-sm text-muted-foreground">
                          <Icons.calendar
                            className="mr-2 h-4 w-4"
                            aria-hidden="true"
                          />
                          Pick a date
                        </span>
                      )}
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date < new Date(new Date().setHours(0, 0, 0, 0)) ||
                      date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="statusId"
          render={({ field }) => (
            <FormItem className="flex w-full items-center gap-12">
              <FormLabel className="text-nowrap text-muted-foreground">
                Status
              </FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value.toString()}
              >
                <FormControl>
                  <SelectTrigger
                    className={cn(
                      buttonVariants({ variant: "ghost" }),
                      "justify-between border-none"
                    )}
                  >
                    <SelectValue />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectGroup>
                    {availableStatuses.map((status) => (
                      <SelectItem key={status.id} value={status.id.toString()}>
                        {status.title}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="priority"
          render={({ field }) => (
            <FormItem className="flex w-full items-center gap-12">
              <FormLabel className="text-nowrap text-muted-foreground">
                Priority
              </FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger
                    className={cn(
                      buttonVariants({ variant: "ghost" }),
                      "justify-between border-none"
                    )}
                  >
                    <SelectValue />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="P1">P1</SelectItem>
                    <SelectItem value="P2">P2</SelectItem>
                    <SelectItem value="P3">P3</SelectItem>
                    <SelectItem value="P4">P4</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="tag"
          render={({ field }) => (
            <FormItem className="flex w-full items-center gap-[4.5rem]">
              <FormLabel className="text-nowrap text-muted-foreground">
                Tag
              </FormLabel>
              <FormControl>
                <Input
                  className="border-none outline-none hover:bg-secondary focus:bg-background focus-visible:ring-0"
                  placeholder="Empty"
                  autoComplete="off"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="mt-2">
              <FormControl>
                <TextareaAutosize
                  placeholder="Add a description"
                  className="w-full resize-none border-b bg-transparent pb-1 text-sm outline-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex flex-col items-start gap-6">
          {subtasksFieldArray.fields.map((field, index) => (
            <div
              key={field.id}
              className="flex w-full items-center justify-between"
            >
              <div className="flex items-start gap-4">
                <FormField
                  control={form.control}
                  name={`subtasks.${index}.done` as const}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <div className="flex flex-col items-start">
                  <FormField
                    control={form.control}
                    name={`subtasks.${index}.title` as const}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <TextareaAutosize
                            placeholder="Task title"
                            className="w-full resize-none border-none bg-transparent text-sm outline-none"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`subtasks.${index}.dueDate` as const}
                    render={({ field }) => (
                      <FormItem>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="flex h-auto w-full justify-start p-0"
                              >
                                {field.value ? (
                                  format(field.value, "PPP")
                                ) : (
                                  <span className="flex items-center text-muted-foreground">
                                    <Icons.calendar
                                      className="mr-2 h-4 w-4"
                                      aria-hidden="true"
                                    />
                                    Pick a date
                                  </span>
                                )}
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) =>
                                date <
                                  new Date(new Date().setHours(0, 0, 0, 0)) ||
                                date < new Date("1900-01-01")
                              }
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <Button
                type="button"
                variant="outline"
                size="icon"
                className="h-8 w-8 rounded-full"
                onClick={() => subtasksFieldArray.remove(index)}
              >
                <Icons.close className="h-4 w-4" aria-hidden="true" />
                <span className="sr-only">Delete item</span>
              </Button>
            </div>
          ))}

          <Button
            size="sm"
            variant="ghost"
            type="button"
            className="text-muted-foreground"
            onClick={() =>
              subtasksFieldArray.append({
                done: false,
                title: "Untitled",
              })
            }
          >
            <Icons.plus className="mr-2 h-4 w-4" aria-hidden="true" />
            Add Subtask
          </Button>
        </div>
        <Button type="submit" disabled={isPending}>
          {isPending && (
            <Icons.spinner
              className="mr-2 h-4 w-4 animate-spin"
              aria-hidden="true"
            />
          )}
          {type} Task
        </Button>
      </form>
    </Form>
  )
}
