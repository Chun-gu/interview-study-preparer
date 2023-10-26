import { useEffect } from 'react'

import { useQuery, useQueryClient } from '@tanstack/react-query'

import { getQuestions } from '@/lib/api'
import { queryKey } from '@/lib/queryKey'
import { useGetQuestions, useSetQuestions } from '@/store'

export default function useQuestions(dateId: string) {
  const questions = useGetQuestions()
  const setQuestions = useSetQuestions()
  const queryClient = useQueryClient()

  const {
    isLoading,
    isError,
    isSuccess,
    data,
    refetch: refetchQuestions,
    isRefetching: isRefetchingQuestions,
    isRefetchError,
  } = useQuery({
    queryKey: queryKey.question.date(dateId),
    queryFn: () => getQuestions(dateId),
    enabled:
      Boolean(dateId) &&
      !Boolean(queryClient.getQueryData(queryKey.question.date(dateId))),
  })

  const isAvaliable =
    !isLoading && !isError && !isRefetchingQuestions && !isRefetchError

  useEffect(() => {
    if (isSuccess && !isRefetchError) setQuestions(data)
  }, [data, isSuccess, setQuestions, isRefetchingQuestions, isRefetchError])

  return {
    isLoading,
    isError,
    isAvaliable,
    questions,
    refetchQuestions,
    isRefetchingQuestions,
  }
}
