import { useRef } from 'react'

import PlusIcon from '@/assets/icons/plus.svg'
import { generateRandomStringOfNumber } from '@/lib/utils'
import { useCreateParticipant } from '@/store'

export default function ParticipantInput() {
  const participantInputRef = useRef<HTMLInputElement>(null)
  const createParticipant = useCreateParticipant()

  function onClickCreateParticipant() {
    if (!participantInputRef.current) return
    const name = participantInputRef.current.value.trim()

    if (name.length === 0) return participantInputRef.current.focus()

    createParticipant({ id: generateRandomStringOfNumber(18), name })
    participantInputRef.current.value = ''
  }

  return (
    <div className="flex w-1/2 items-center gap-1">
      <input
        ref={participantInputRef}
        type="text"
        size={3}
        maxLength={6}
        placeholder="참여자 추가"
        className="grow rounded-md bg-gray-100 px-5 py-1 text-center placeholder:text-sm"
      />
      <button
        onClick={onClickCreateParticipant}
        className="rounded-md bg-blue-200 p-1 hover:bg-blue-500 hover:text-white">
        <span className="sr-only">참여자 추가</span>
        <PlusIcon className="h-5 w-5" />
      </button>
    </div>
  )
}
