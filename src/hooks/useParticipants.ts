import { useEffect } from 'react'

import { useQuery, useQueryClient } from '@tanstack/react-query'

import { getParticipants } from '@/lib/api'
import { queryKey } from '@/lib/queryKey'
import { useGetParticipants, useSetParticipants } from '@/store'

export default function useParticipants(dateId: string) {
  const participants = useGetParticipants()
  const setParticipants = useSetParticipants()
  const queryClient = useQueryClient()

  const {
    isLoading,
    isError,
    isSuccess,
    data,
    refetch: refetchParticipants,
    isRefetching: isRefetchingParticipants,
    isRefetchError,
  } = useQuery({
    queryKey: queryKey.participant.date(dateId),
    queryFn: () => getParticipants(dateId),
    enabled:
      Boolean(dateId) &&
      !Boolean(queryClient.getQueryData(queryKey.participant.date(dateId))),
  })

  const isAvailable =
    !isLoading && !isError && !isRefetchingParticipants && !isRefetchError

  useEffect(() => {
    if (isSuccess) setParticipants(data)
  }, [
    data,
    isSuccess,
    setParticipants,
    isRefetchingParticipants,
    isRefetchError,
  ])

  return {
    isLoading,
    isError,
    isAvailable,
    participants,
    refetchParticipants,
    isRefetchingParticipants,
  }
}
