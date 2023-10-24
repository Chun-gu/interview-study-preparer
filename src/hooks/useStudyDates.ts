import { useQuery } from '@tanstack/react-query'

import { getStudyDates } from '@/lib/api'
import { queryKey } from '@/lib/queryKey'

export default function useStudyDates() {
  const {
    isLoading,
    isError,
    data: studyDates,
    refetch,
    isRefetching: isRefetchingStudyDates,
  } = useQuery({
    queryKey: queryKey.studyDate.default,
    queryFn: getStudyDates,
  })

  const isAvailable = !isLoading && !isError && !isRefetchingStudyDates

  return {
    isLoading,
    isError,
    isAvailable,
    studyDates,
    refetch,
    isRefetchingStudyDates,
  }
}
