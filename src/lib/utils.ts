import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

import type { ClassValue } from 'clsx'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateRandomStringOfNumber(digits: number) {
  return Math.floor(Math.random() * Math.pow(10, digits)).toString()
}
