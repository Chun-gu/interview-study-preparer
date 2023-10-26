'use client'

import { useRef } from 'react'

import useQuestions from '@/hooks/useQuestions'

import ErrorFallback from './ErrorFallback'
import LoadingFallback from './LoadingFallback'
import QuestionListItem from './QuestionListItem'

type Props = { dateId: string }

export default function QuestionList({ dateId }: Props) {
  const questionListRef = useRef<HTMLUListElement>(null)
  const { isLoading, isError, questions, refetchQuestions } =
    useQuestions(dateId)

  if (isLoading) return <LoadingFallback />

  if (isError) return <ErrorFallback refetch={refetchQuestions} />

  return (
    <ul ref={questionListRef} className="flex flex-col gap-1">
      {questions?.map((question) => (
        <QuestionListItem key={question.id} {...question} />
      ))}
    </ul>
  )
}
