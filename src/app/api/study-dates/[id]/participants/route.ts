import { NextResponse } from 'next/server'

import { serverSideFetch } from '@/app/api/_lib/serverSideFetch'

type Params = { params: { id: string } }

export async function GET(request: Request, { params: { id } }: Params) {
  try {
    const res = await serverSideFetch(`/channels/${id}/messages`, {
      method: 'GET',
      cache: 'no-store',
    })

    if (!res.ok) throw Error

    const data = (await res.json()) as Array<{
      author: { id: string; global_name: string }
    }>

    const participant = new Map<string, string>()

    data.forEach(({ author: { id: authorId, global_name } }) => {
      if (!participant.has(authorId)) participant.set(authorId, global_name)
    })

    const participants = Array.from(participant.entries()).map(
      ([id, name]) => ({ id, name }),
    )

    return NextResponse.json({ participants }, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    )
  }
}
