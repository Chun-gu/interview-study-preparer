export type StudyDate = { id: string; date: string }
export type Participant = { id: string; name: string }
export type Question = { id: string; content: string }
export type Result = { participant: Participant; questions: Array<Question> }

export type Writable<T> = { -readonly [K in keyof T]: T[K] }
