import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export const fetcher = (...args) => fetch(...args).then(res => res.json())


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
