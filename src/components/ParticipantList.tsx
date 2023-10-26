import { useRef } from 'react'

import useParticipants from '@/hooks/useParticipants'

import ErrorFallback from './ErrorFallback'
import LoadingFallback from './LoadingFallback'
import ParticipantListItem from './ParticipantListItem'

type Props = { dateId: string }

export default function ParticipantList({ dateId }: Props) {
  const participantListRef = useRef<HTMLUListElement>(null)

  const { isLoading, isError, participants, refetchParticipants } =
    useParticipants(dateId)

  if (isLoading) return <LoadingFallback />

  if (isError) return <ErrorFallback refetch={refetchParticipants} />

  return (
    <ul ref={participantListRef} className="grid grid-cols-2 gap-1">
      {participants?.map((participant) => (
        <ParticipantListItem key={participant.id} {...participant} />
      ))}
    </ul>
  )
}
