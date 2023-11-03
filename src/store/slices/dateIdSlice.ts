import type { StateCreator } from 'zustand'

export interface DateIdSlice {
  dateId: string
  setDateId: (dateId: string) => void
}

export const createDateIdSlice: StateCreator<
  DateIdSlice,
  [],
  [],
  DateIdSlice
> = (set) => ({
  dateId: '',
  setDateId: (dateId) => set(() => ({ dateId })),
})
