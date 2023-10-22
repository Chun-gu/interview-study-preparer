'use client'

import { ChangeEvent, useEffect, useState } from 'react'

export default function Home() {
  const [studyDates, setStudyDates] = useState<Array<StudyDate>>([])
  const [names, setNames] = useState([])
  const [questions, setQuestions] = useState([])

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

  async function onChange(e: ChangeEvent<HTMLSelectElement>) {
    const dateId = e.currentTarget.value

    try {
      const res = await fetch(`/api/study-dates/${dateId}/names-questions`, {
        method: 'GET',
      })
      if (!res.ok) throw Error

      const { names, questions } = await res.json()
      setNames(names)
      setQuestions(questions)
    } catch (error) {
      console.error(error)
    }
  }

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
            onChange={onChange}
            className="rounded-md bg-gray-200 p-1">
            {studyDates.map((studyDate) => (
              <option key={studyDate.id} value={studyDate.id}>
                {studyDate.name}
              </option>
            ))}
          </select>
        </section>
        <section className="mb-2">
          <h2 className="text-lg font-bold">면접 참여자</h2>
          <ul>
            {names.map((name) => (
              <li key={name} className="rounded-md bg-yellow-200 px-2 py-1">
                <input
                  type="text"
                  defaultValue={name}
                  className="bg-yellow-200"
                />
              </li>
            ))}
          </ul>
        </section>
        <section className="mb-2">
          <h2 className="text-lg font-bold">질문 목록</h2>
          <ul>
            {questions.map((question) => (
              <li key={question}>
                <p>{question}</p>
              </li>
            ))}
          </ul>
        </section>
        <button>시작</button>
      </main>
    </>
  )
}
