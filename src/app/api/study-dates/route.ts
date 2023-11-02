import { NextResponse } from 'next/server'

import { serverSideFetch } from '../_lib/serverSideFetch'

export async function GET(request: Request) {
  try {
    const res = await serverSideFetch(
      `/channels/${process.env.INTERVIEW_QUESTIONS_CHANNEL_ID}/messages`,
      {
        method: 'GET',
        cache: 'no-store',
      },
    )

    if (!res.ok) throw new Error()

    const data = (await res.json()) as Array<{
      thread: { id: string; name: string }
    }>

    const studyDates = data.map((datum) => ({
      id: datum.thread.id,
      date: datum.thread.name,
    }))

    return NextResponse.json({ studyDates }, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    )
  }
}
