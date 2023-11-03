'use client'

import { useLayoutEffect, useRef, useState } from 'react'

import ParticipantInput from '@/components/ParticipantInput'
import ParticipantList from '@/components/ParticipantList'
import QuestionInput from '@/components/QuestionInput'
import QuestionList from '@/components/QuestionList'
import RefreshButton from '@/components/RefreshButton'
import ResultListItem from '@/components/ResultListItem'
import StartButton from '@/components/StartButton'
import StudyDateSelect from '@/components/StudyDateSelect'
import useParticipants from '@/hooks/useParticipants'
import useQuestions from '@/hooks/useQuestions'

import type { Result } from '@/types'

export default function Home() {
  const [dateId, setDateId] = useState('')
  const [results, setResults] = useState<Array<Result>>([])
  const resultSectionRef = useRef<HTMLHeadingElement>(null)

  const { refetchParticipants, isRefetchingParticipants } =
    useParticipants(dateId)
  const { refetchQuestions, isRefetchingQuestions } = useQuestions(dateId)

  function onSelectDateId(dateId: string) {
    setDateId(dateId)
    setResults([])
  }

  useLayoutEffect(() => {
    if (results.length !== 0) {
      resultSectionRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [results])

  return (
    <>
      <header className="border-b py-4 text-center text-3xl font-extrabold">
        면접 스터디 사전 준비
      </header>

      <main className="m-auto max-w-[375px] p-4">
        <section className="mb-4">
          <h2 className="mb-1 h-8 text-xl font-bold">일자 선택</h2>
          <StudyDateSelect onSelect={onSelectDateId} />
        </section>

        {dateId && (
          <>
            <section className="mb-4">
              <div className="mb-1 flex h-8 items-center justify-between">
                <div className="flex h-full gap-2">
                  <h2 className="text-xl font-bold">참여자 목록</h2>
                  <RefreshButton
                    onClick={() => refetchParticipants()}
                    isRefetching={isRefetchingParticipants}>
                    참여자 목록 새로고침
                  </RefreshButton>
                </div>
                <ParticipantInput />
              </div>
              <ParticipantList dateId={dateId} />
            </section>

            <section className="mb-4">
              <div className="mb-1 flex h-8 items-center gap-2">
                <h2 className="text-xl font-bold">질문 목록</h2>
                <RefreshButton
                  onClick={() => refetchQuestions()}
                  isRefetching={isRefetchingQuestions}>
                  질문 목록 새로고침
                </RefreshButton>
              </div>
              <QuestionInput />
              <QuestionList dateId={dateId} />
            </section>

            <StartButton
              setResults={setResults}
              className="w-full rounded-md bg-green-500 p-2 font-bold tracking-widest text-white disabled:bg-gray-300">
              준비 완료!
            </StartButton>
          </>
        )}

        {results.length !== 0 && (
          <section key={dateId} ref={resultSectionRef} className="mt-4">
            <h2 className="mb-2 text-center text-xl font-bold">결과</h2>
            <ol className="flex flex-col gap-2">
              {results.map((result) => (
                <ResultListItem key={result.participant.id} {...result} />
              ))}
            </ol>
          </section>
        )}
      </main>
    </>
  )
}
