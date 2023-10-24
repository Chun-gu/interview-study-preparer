import { cn } from '@/lib/utils'

type Props = { className?: string }

export default function LoadingFallback({ className }: Props) {
  return (
    <div
      className={cn(
        'flex h-[68px] w-full animate-pulse items-center justify-center rounded-md bg-gray-100 text-center font-bold',
        className,
      )}>
      로딩 중이에요...
    </div>
  )
}
