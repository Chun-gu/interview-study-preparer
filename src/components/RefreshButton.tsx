import type { ComponentProps } from 'react'

import RefreshIcon from '@/assets/icons/refresh.svg'
import { cn } from '@/lib/utils'

type Props = ComponentProps<'button'> & { isRefetching?: boolean }

export default function RefreshButton({
  children,
  className,
  onClick,
  isRefetching,
}: Props) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'flex aspect-square h-full items-center justify-center rounded-md bg-gray-100 hover:bg-gray-200',
        className,
      )}>
      <span className="sr-only">{children}</span>
      <RefreshIcon
        className={`h-5 w-5 ${isRefetching && 'hover:animate-spin'}`}
      />
    </button>
  )
}
