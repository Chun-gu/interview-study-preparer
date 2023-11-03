import localFont from 'next/font/local'

import './globals.css'
import Provider from './provider'

import type { Metadata } from 'next'
import type { ReactNode } from 'react'

const pretendard = localFont({
  src: '../../public/PretendardVariable.woff2',
  display: 'swap',
  preload: true,
  fallback: [
    '-apple-system',
    'BlinkMacSystemFont',
    'system-ui',
    'Roboto',
    'Helvetica Neue',
    'Segoe UI',
    'Apple SD Gothic Neo',
    'Noto Sans KR',
    'Malgun Gothic',
    'Apple Color Emoji',
    'Segoe UI Emoji',
    'Segoe UI Symbol',
    'sans-serif',
  ],
  adjustFontFallback: 'Arial',
})

export const metadata: Metadata = {
  title: '면접 스터디 사전 준비 서비스',
  description:
    '원활한 면접 스터디 진행을 위해 순서 배치와 문제 배분을 도와주는 서비스입니다.',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="kr">
      <body className={pretendard.className}>
        <Provider>{children}</Provider>
      </body>
    </html>
  )
}
