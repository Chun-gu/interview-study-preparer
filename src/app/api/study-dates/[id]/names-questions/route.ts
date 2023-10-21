import { NextResponse } from 'next/server'

type Params = { params: { id: string } }

export async function GET(request: Request, { params: { id } }: Params) {
  try {
    const res = await fetch(
      `${process.env.DISCORD_API_ENDPOINT}/channels/${id}/messages`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bot ${process.env.DISCORD_BOT_API_KEY}`,
          'Content-Type': 'application/json; charset=UTF-8',
          'User-Agent':
            'DiscordBot (https://github.com/chun-gu/interview-study-preparer, 1.0.0)',
        },
        cache: 'no-store',
      },
    )

    if (!res.ok) throw Error

    const data = (await res.json()) as Array<{
      content: string
      author: { global_name: string }
    }>

    const name = new Set<string>()
    const questions: Array<string> = []

    data.forEach(({ content, author: { global_name } }) => {
      questions.push(content)
      name.add(global_name)
    })

    const names = Array.from(name)

    return NextResponse.json({ names, questions }, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    )
  }
}
