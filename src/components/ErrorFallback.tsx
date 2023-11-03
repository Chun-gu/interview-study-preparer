import { type QueryObserverResult, RefetchOptions } from '@tanstack/react-query'

import { cn } from '@/lib/utils'

type Props = {
  className?: string
  refetch?: (
    options?: RefetchOptions | undefined,
  ) => Promise<QueryObserverResult<unknown, Error>>
}

export default function ErrorFallback({ className, refetch }: Props) {
  return (
    <div
      className={cn(
        'flex h-[68px] w-full flex-col items-center justify-center rounded-md border border-red-500 bg-gray-100',
        className,
      )}>
      <p className="font-bold text-red-500">에러가 발생했어요!</p>
      {!!refetch && (
        <button
          onClick={() => refetch()}
          className="rounded-md bg-red-500 px-3 py-1 text-sm text-white">
          재시도
        </button>
      )}
    </div>
  )
}
