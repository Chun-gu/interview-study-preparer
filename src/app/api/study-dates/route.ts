import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const res = await fetch(
      `${process.env.DISCORD_API_ENDPOINT}/channels/${process.env.INTERVIEW_QUESTIONS_CHANNEL_ID}/messages`,
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

    const data = (await res.json()) as Array<{ thread: StudyDate }>

    const studyDates = data.map((datum) => ({
      id: datum.thread.id,
      name: datum.thread.name,
    }))

    return NextResponse.json({ studyDates }, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    )
  }
}
