import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { toast } from 'sonner';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const renderApiError = (err: any) => {
  const message =
    err?.response?.data?.message ||
    err?.message ||
    'An unexpected error occurred. Please try again.';

    toast.error(message);
};