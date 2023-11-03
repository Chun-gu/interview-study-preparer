import type { Participant } from '@/types'
import type { StateCreator } from 'zustand'

export interface ParticipantSlice {
  participants: Array<Participant>
  setParticipants: (participants: Array<Participant>) => void
  createParticipant: (participant: Participant) => void
  updateParticipant: (participant: Participant) => void
  deleteParticipant: (targetId: Participant['id']) => void
}

export const createParticipantSlice: StateCreator<
  ParticipantSlice,
  [],
  [],
  ParticipantSlice
> = (set) => ({
  participants: [],
  setParticipants: (participants) => set(() => ({ participants })),
  createParticipant: (participant) =>
    set((prev) => ({ participants: [...prev.participants, participant] })),
  updateParticipant: (participant) =>
    set((prev) => ({
      participants: prev.participants.map((prevParticipant) =>
        prevParticipant.id === participant.id ? participant : prevParticipant,
      ),
    })),
  deleteParticipant: (targetId) =>
    set((prev) => ({
      participants: prev.participants.filter(
        (prevParticipant) => prevParticipant.id !== targetId,
      ),
    })),
})
