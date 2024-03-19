"use client"

import * as React from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { dueDatesOptions, priorityOptions, sortOptions } from "@/config/task"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../../../../../components/ui/dropdown-menu"
import {
  Command,
  CommandList,
  CommandGroup,
  CommandItem,
} from "../../../../../../components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../../../../../components/ui/popover"
import { Button } from "../../../../../../components/ui/button"
import { Switch } from "../../../../../../components/ui/switch"
import { Separator } from "../../../../../../components/ui/separator"
import { Icons } from "../../../../../../components/icons"
import { cn } from "@/lib/utils"

export function View() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = React.useTransition()

  // search params
  const showCompletedTasks = searchParams?.get("showCompletedTasks") ?? "true"
  const sort = searchParams?.get("sort") ?? "createdAt.desc"
  const dueDate = searchParams?.get("dueDate")
  const prioritiesParam = searchParams?.get("priorities")

  // create query string
  const createQueryString = React.useCallback(
    (params: Record<string, string | number | null>) => {
      const newSearchParams = new URLSearchParams(searchParams?.toString())

      for (const [key, value] of Object.entries(params)) {
        if (value === null) {
          newSearchParams.delete(key)
        } else {
          newSearchParams.set(key, String(value))
        }
      }

      return newSearchParams.toString()
    },
    [searchParams]
  )

  // priorities filter
  const [selectedPriorities, setSelectedPriorities] = React.useState<
    string[] | null
  >(prioritiesParam ? prioritiesParam.split(".").map((p) => p) : null)

  React.useEffect(() => {
    startTransition(() => {
      const newQueryString = createQueryString({
        priorities:
          selectedPriorities?.length &&
          selectedPriorities.length !== priorityOptions.length
            ? selectedPriorities.join(".")
            : null,
      })

      router.push(`${pathname}?${newQueryString}`, {
        scroll: false,
      })
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedPriorities])

  return (
    <div className="grid w-full">
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center">
          <Icons.done
            className="mr-2 h-5 w-5 text-muted-foreground"
            aria-hidden="true"
          />
          <span className="text-sm">Show completed Tasks</span>
        </div>

        <Switch
          checked={showCompletedTasks === "true"}
          onCheckedChange={(value) =>
            startTransition(() => {
              router.push(
                `${pathname}?${createQueryString({
                  showCompletedTasks: value ? "true" : "false",
                })}`,
                {
                  scroll: false,
                }
              )
            })
          }
          disabled={isPending}
        />
      </div>

      <Separator className="mb-2 mt-4" />

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="w-full justify-between pl-1.5 font-normal"
            aria-label={`Sort Tasks`}
            disabled={isPending}
          >
            Sort by
            <div className="flex items-center gap-1">
              <span className="text-[12px] text-muted-foreground">
                {sortOptions.find((option) => option.value === sort)?.label ??
                  ""}
              </span>
              <Icons.chevronDown className="h-4 w-4" aria-hidden="true" />
            </div>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-60">
          <DropdownMenuLabel>Sort by</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <div className="space-y-1">
            {sortOptions.map((option) => (
              <DropdownMenuItem
                key={option.label}
                className={cn("w-full justify-between", {
                  "bg-accent": sort === option.value,
                })}
                onClick={() => {
                  startTransition(() => {
                    router.push(
                      `${pathname}?${createQueryString({
                        sort: option.value,
                      })}`,
                      {
                        scroll: false,
                      }
                    )
                  })
                }}
              >
                {option.label}
              </DropdownMenuItem>
            ))}
          </div>
        </DropdownMenuContent>
      </DropdownMenu>

      <Separator className="mb-4 mt-2" />

      <div className="space-y-1">
        <h5 className="pl-1.5 text-sm font-bold">Filter by</h5>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="w-full justify-between font-normal"
              aria-label={`Filter Tasks by Due date`}
              disabled={isPending}
            >
              Due Date
              <div className="flex items-center gap-1">
                <span className="text-[12px] text-muted-foreground">
                  {dueDatesOptions.find((option) => option.value === dueDate)
                    ?.label ?? ""}
                </span>
                <Icons.chevronDown className="h-4 w-4" aria-hidden="true" />
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-60 space-y-1">
            {dueDatesOptions.map((option) => (
              <DropdownMenuItem
                key={option.label}
                className={cn("w-full justify-between", {
                  "bg-accent": dueDate === option.value,
                })}
                onClick={() => {
                  startTransition(() => {
                    router.push(
                      `${pathname}?${createQueryString({
                        dueDate: option.value,
                      })}`,
                      {
                        scroll: false,
                      }
                    )
                  })
                }}
              >
                {option.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="ghost"
              className="w-full justify-between font-normal"
              aria-label={`Filter Tasks by Priorities`}
              disabled={isPending}
            >
              Priorities
              <div className="flex items-center gap-1">
                <span className="text-[12px] text-muted-foreground">
                  {selectedPriorities?.length
                    ? selectedPriorities.join("|")
                    : "All (default)"}
                </span>
                <Icons.chevronDown className="h-4 w-4" aria-hidden="true" />
              </div>
            </Button>
          </PopoverTrigger>
          <PopoverContent align="start" className="w-48 p-2">
            <Command>
              <CommandList>
                <CommandGroup className="space-y-1">
                  {priorityOptions.map((option) => {
                    const isSelected = selectedPriorities?.includes(option)

                    return (
                      <CommandItem
                        key={option}
                        className="flex w-full cursor-pointer items-center justify-between"
                        onSelect={() =>
                          isSelected
                            ? setSelectedPriorities(
                                (prev) =>
                                  prev?.filter((item) => item !== option) ?? []
                              )
                            : setSelectedPriorities((prev) => [
                                ...(prev ?? []),
                                option,
                              ])
                        }
                        disabled={isPending}
                      >
                        {option}
                        {isSelected && (
                          <Icons.tick className="h-4 w-4" aria-hidden="true" />
                        )}
                      </CommandItem>
                    )
                  })}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>

      <Separator className="my-2" />

      <Button
        variant="ghost"
        className="w-full justify-start pl-1.5 font-normal !text-destructive"
        onClick={() =>
          startTransition(() =>
            router.push(
              `${pathname}?${createQueryString({
                showCompletedTasks: null,
                sort: "createdAt.desc",
                dueDate: null,
                priorities: null,
              })}`,
              {
                scroll: false,
              }
            )
          )
        }
        disabled={isPending}
      >
        Reset All
      </Button>
    </div>
  )
}
