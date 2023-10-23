import { create } from 'zustand'

import { DateIdSlice, createDateIdSlice } from './slices/dateIdSlice'
import {
  ParticipantSlice,
  createParticipantSlice,
} from './slices/participantSlice'
import { QuestionSlice, createQuestionSlice } from './slices/questionSlice'

const useStore = create<DateIdSlice & ParticipantSlice & QuestionSlice>()(
  (...a) => ({
    ...createDateIdSlice(...a),
    ...createParticipantSlice(...a),
    ...createQuestionSlice(...a),
  }),
)

export const useGetDateId = () => useStore((state) => state.dateId)
export const useSetDateId = () => useStore((state) => state.setDateId)

export const useGetParticipants = () => useStore((state) => state.participants)
export const useSetParticipants = () =>
  useStore((state) => state.setParticipants)
export const useCreateParticipant = () =>
  useStore((state) => state.createParticipant)
export const useUpdateParticipant = () =>
  useStore((state) => state.updateParticipant)
export const useDeleteParticipant = () =>
  useStore((state) => state.deleteParticipant)

export const useGetQuestions = () => useStore((state) => state.questions)
export const useSetQuestions = () => useStore((state) => state.setQuestions)
export const useCreateQuestion = () => useStore((state) => state.createQuestion)
export const useUpdateQuestion = () => useStore((state) => state.updateQuestion)
export const useDeleteQuestion = () => useStore((state) => state.deleteQuestion)
