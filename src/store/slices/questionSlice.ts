import type { Question } from '@/types'
import type { StateCreator } from 'zustand'

export interface QuestionSlice {
  questions: Array<Question>
  setQuestions: (questions: Array<Question>) => void
  createQuestion: (question: Question) => void
  updateQuestion: (question: Question) => void
  deleteQuestion: (targetId: Question['id']) => void
}

export const createQuestionSlice: StateCreator<
  QuestionSlice,
  [],
  [],
  QuestionSlice
> = (set) => ({
  questions: [],
  setQuestions: (questions) => set(() => ({ questions })),
  createQuestion: (question) =>
    set((prev) => ({ questions: [...prev.questions, question] })),
  updateQuestion: (question) =>
    set((prev) => ({
      questions: prev.questions.map((prevQuestion) =>
        prevQuestion.id === question.id ? question : prevQuestion,
      ),
    })),
  deleteQuestion: (targetId) =>
    set((prev) => ({
      questions: prev.questions.filter(
        (prevQuestion) => prevQuestion.id !== targetId,
      ),
    })),
})
