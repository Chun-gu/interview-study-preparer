import { NextResponse } from 'next/server'

import { serverSideFetch } from '@/app/api/_lib/serverSideFetch'

import type { Question } from '@/types'

type Params = { params: { id: string } }

export async function GET(request: Request, { params: { id } }: Params) {
  try {
    const res = await serverSideFetch(`/channels/${id}/messages`, {
      method: 'GET',
      cache: 'no-store',
    })

    if (!res.ok) throw Error

    const data = (await res.json()) as Array<Question>

    const questions = data.map(({ id, content }) => ({
      id,
      content,
    }))

    return NextResponse.json({ questions }, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    )
  }
}
