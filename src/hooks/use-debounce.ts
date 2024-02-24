type DebounceFunction<T extends unknown[]> = (...args: T) => void

export function useDebounce<T extends unknown[]>(
  mainFunction: DebounceFunction<T>,
  timeout = 300
): DebounceFunction<T> {
  // Declare a variable called 'timer' to store the timer ID
  let timer: ReturnType<typeof setTimeout>

  // Return an anonymous function that takes in any number of arguments
  return function (...args: T) {
    // Clear the previous timer to prevent the execution of 'mainFunction'
    clearTimeout(timer)

    // Set a new timer that will execute 'mainFunction' after the specified delay
    timer = setTimeout(() => {
      mainFunction(...args)
    }, timeout)
  }
}
