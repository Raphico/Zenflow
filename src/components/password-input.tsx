import * as React from "react"

import { Input, type InputProps } from "./ui/input"
import { Button } from "./ui/button"
import { Icons } from "./icons"
import { cn } from "@/lib/utils"

const PasswordInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false)

    const toggleShowPassword = () => setShowPassword((prevState) => !prevState)

    return (
      <div className="relative">
        <Input
          ref={ref}
          type={showPassword ? "text" : "password"}
          className={cn(className)}
          {...props}
        />
        <Button
          type="button"
          onClick={toggleShowPassword}
          variant="ghost"
          className={cn("absolute right-0 top-0 hover:bg-transparent", {
            hidden: props.value === "" || props.disabled,
          })}
        >
          {showPassword ? (
            <Icons.hide className="h-4 w-4" aria-hidden="true" />
          ) : (
            <Icons.show className="h-4 w-4" aria-hidden="true" />
          )}
        </Button>
      </div>
    )
  }
)

PasswordInput.displayName = Input.displayName

export { PasswordInput }
