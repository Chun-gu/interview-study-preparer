import { ComponentProps, Dispatch, SetStateAction } from 'react'

import useParticipants from '@/hooks/useParticipants'
import useQuestions from '@/hooks/useQuestions'
import useStudyDates from '@/hooks/useStudyDates'
import { shuffle } from '@/lib/utils'
import { useGetDateId } from '@/store'

type Props = ComponentProps<'button'> & {
  setResults: Dispatch<SetStateAction<Array<Result>>>
}

export default function StartButton({
  children,
  className,
  setResults,
}: Props) {
  const dateId = useGetDateId()
  const { isAvailable: isAvailableStudyDates } = useStudyDates()
  const { isAvailable: isAvailableParticipants, participants } =
    useParticipants(dateId)
  const { isAvaliable: isAvailableQuestions, questions } = useQuestions(dateId)

  function onClickStart() {
    const shuffledParticipants = shuffle(participants)
    const shuffledQuestions = shuffle(questions)

    const results: Array<Result> = shuffledParticipants.map((participant) => ({
      participant,
      questions: [],
    }))

    for (let i = 0; i < shuffledQuestions.length; i += 1) {
      results[i % shuffledParticipants.length].questions.push(
        shuffledQuestions[i],
      )
    }

    setResults(results)
  }

  return (
    <button
      onClick={onClickStart}
      disabled={
        !isAvailableStudyDates ||
        !isAvailableParticipants ||
        !isAvailableQuestions
      }
      className={className}>
      {children}
    </button>
  )
}
