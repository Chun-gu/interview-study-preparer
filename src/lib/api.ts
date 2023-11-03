import type { Participant, Question, StudyDate } from '@/types'

export async function getStudyDates(): Promise<Array<StudyDate>> {
  try {
    const res = await fetch('/api/study-dates', {
      method: 'GET',
    })

    if (!res.ok) throw new Error(`${res.status}`)

    const { studyDates } = await res.json()

    return studyDates
  } catch (error) {
    if (error instanceof Error) throw new Error(error.message)
    else throw new Error('unknown error')
  }
}

export async function getParticipants(
  dateId: string,
): Promise<Array<Participant>> {
  try {
    const res = await fetch(`/api/study-dates/${dateId}/participants`, {
      method: 'GET',
    })

    if (!res.ok) throw new Error(`${res.status}`)

    const { participants } = await res.json()

    return participants
  } catch (error) {
    if (error instanceof Error) throw new Error(error.message)
    else throw new Error('unknown error')
  }
}

export async function getQuestions(dateId: string): Promise<Array<Question>> {
  try {
    const res = await fetch(`/api/study-dates/${dateId}/questions`, {
      method: 'GET',
    })
    if (!res.ok) throw new Error(`${res.status}`)

    const { questions } = await res.json()

    return questions
  } catch (error) {
    if (error instanceof Error) throw new Error(error.message)
    else throw new Error('unknown error')
  }
}
