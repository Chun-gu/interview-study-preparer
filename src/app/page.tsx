'use client'

import { useEffect, useState } from 'react'

export default function Home() {
  const [studyDates, setStudyDates] = useState<Array<StudyDate>>([])

  useEffect(() => {
    const abortController = new AbortController()

    async function getStudyDates() {
      try {
        const res = await fetch('/api/study-dates', {
          method: 'GET',
          signal: abortController.signal,
        })
        if (!res.ok) throw Error

        const { studyDates } = await res.json()
        setStudyDates(studyDates)
      } catch (error) {
        console.error(error)
      }
    }
    getStudyDates()

    return () => {
      abortController.abort()
    }
  }, [])

  return (
    <>
      <header className="border-b py-4 text-center text-2xl font-extrabold">
        면접 스터디 사전 준비
      </header>
      <main className="m-auto max-w-[375px] p-4">
        <section className="mb-2">
          <h2 className="text-lg font-bold">일자 선택</h2>
          <label htmlFor="studyDates" className="sr-only">
            일자를 선택하세요.
          </label>
          <select
            name="studyDates"
            id="studyDates"
            className="rounded-md bg-gray-200 p-1">
            {studyDates.map((studyDate) => (
              <option key={studyDate.id} value={studyDate.id}>
                {studyDate.name}
              </option>
            ))}
          </select>
        </section>
      </main>
    </>
  )
}
