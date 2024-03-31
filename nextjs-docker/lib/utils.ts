import { type ClassValue, clsx } from "clsx"
import { Inngest } from "inngest";
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Create a client to send and receive events
export const inngest = new Inngest({ 
  id: "my-app",
  servePath: "/next/api/inngest" 
});