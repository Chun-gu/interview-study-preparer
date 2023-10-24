import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

import type { ClassValue } from 'clsx'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateRandomStringOfNumber(digits: number) {
  return Math.floor(Math.random() * Math.pow(10, digits)).toString()
}

/**
 * Fisher-Yates 알고리즘을 사용한 shuffle
 * @see {@link https://ko.wikipedia.org/wiki/%ED%94%BC%EC%85%94-%EC%98%88%EC%9D%B4%EC%B8%A0_%EC%85%94%ED%94%8C Wikipedia}
 * @see {@link https://ko.javascript.info/task/shuffle 모던 JavaScript 튜토리얼}
 */
export function shuffle<T>(array: T[]) {
  const shuffledArray = [...array]
  const lastIndex = shuffledArray.length - 1

  for (let i = lastIndex; i > 0; i -= 1) {
    let randomIndex = Math.floor(Math.random() * (i + 1))

    ;[shuffledArray[i], shuffledArray[randomIndex]] = [
      shuffledArray[randomIndex],
      shuffledArray[i],
    ]
  }

  return shuffledArray
}
