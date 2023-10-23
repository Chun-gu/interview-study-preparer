export const queryKey = {
  studyDate: {
    default: ['studyDate'] as const,
  },
  participant: {
    default: ['participants'] as const,
    date: (dateId: string) => [...queryKey.participant.default, dateId],
  },
  question: {
    default: ['questions'] as const,
    date: (dateId: string) => [...queryKey.question.default, dateId],
  },
}
