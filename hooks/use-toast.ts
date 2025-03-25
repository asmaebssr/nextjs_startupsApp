"use client"

import { Toaster } from "@/components/ui/sonner"
import { toast as sonnerToast } from "sonner"

export function useToast() {
  return {
    toast: sonnerToast,
    dismiss: sonnerToast.dismiss,
    Toaster,
  }
}