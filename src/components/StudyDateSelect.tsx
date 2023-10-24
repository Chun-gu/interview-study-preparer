import { ChangeEvent } from 'react'

import useStudyDates from '@/hooks/useStudyDates'

import ErrorFallback from './ErrorFallback'
import LoadingFallback from './LoadingFallback'
import RefreshButton from './RefreshButton'

type Props = {
  onSelect: (dateId: string) => void
}

export default function StudyDateSelect({ onSelect }: Props) {
  const {
    isLoading,
    isError,
    studyDates,
    refetch: refetchStudyDates,
    isRefetchingStudyDates,
  } = useStudyDates()

  async function onChange(e: ChangeEvent<HTMLSelectElement>) {
    const dateId = e.currentTarget.value
    onSelect(dateId)
  }

  if (isLoading) return <LoadingFallback className="h-8" />

  if (isError)
    return (
      <ErrorFallback
        refetch={refetchStudyDates}
        className="h-8 flex-row gap-3"
      />
    )

  return (
    <div className="flex h-8 w-1/2 items-center gap-1">
      <select
        name="studyDates"
        id="studyDates"
        onChange={onChange}
        defaultValue={'placeholder'}
        className="min-w-0 cursor-pointer self-stretch rounded-md bg-gray-100">
        <option value={'placeholder'} disabled>
          일자를 선택하세요.
        </option>
        {studyDates?.map((studyDate) => (
          <option key={studyDate.id} value={studyDate.id}>
            {studyDate.date}
          </option>
        ))}
      </select>

      <RefreshButton
        onClick={() => refetchStudyDates()}
        isRefetching={isRefetchingStudyDates}>
        일자 목록 새로고침
      </RefreshButton>
    </div>
  )
}
