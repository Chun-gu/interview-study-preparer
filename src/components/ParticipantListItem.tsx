import { useEffect, useRef, useState } from 'react'

import CheckIcon from '@/assets/icons/check.svg'
import MinusIcon from '@/assets/icons/minus.svg'
import PencilIcon from '@/assets/icons/pencil.svg'
import { useDeleteParticipant, useUpdateParticipant } from '@/store'

import type { Participant } from '@/types'

type Props = Participant

export default function ParticipantListItem({ id, name }: Props) {
  const [isEditing, setIsEditing] = useState(false)
  const participantInputRef = useRef<HTMLInputElement>(null)
  const updateParticipant = useUpdateParticipant()
  const deleteParticipant = useDeleteParticipant()

  function onClickEdit() {
    setIsEditing(true)
  }

  function onClickConfirm() {
    if (!participantInputRef.current) return

    const newName = participantInputRef.current.value.trim()
    if (newName.length === 0) return participantInputRef.current.focus()

    updateParticipant({ id, name: newName })
    setIsEditing(false)
  }

  function onClickDelete(id: string) {
    deleteParticipant(id)
  }

  useEffect(() => {
    if (isEditing) participantInputRef.current?.focus()
  }, [isEditing])

  return (
    <li
      key={id}
      className="group relative flex rounded-md bg-gray-100 px-6 py-1">
      {isEditing ? (
        <button
          onClick={onClickConfirm}
          className="absolute left-1 top-1/2 -translate-y-1/2 text-green-500">
          <span className="sr-only">확정</span>
          <CheckIcon className="h-5 w-5" />
        </button>
      ) : (
        <button
          onClick={onClickEdit}
          className="invisible absolute left-1 top-1/2 -translate-y-1/2 text-yellow-500 group-hover:visible">
          <span className="sr-only">수정</span>
          <PencilIcon className="h-5 w-5" />
        </button>
      )}

      <input
        ref={participantInputRef}
        type="text"
        name={id}
        defaultValue={name}
        maxLength={6}
        disabled={!isEditing}
        className="max-w-full bg-gray-100 text-center"
      />

      <button
        onClick={() => onClickDelete(id)}
        className="invisible absolute right-1 top-1/2 -translate-y-1/2 text-red-500 group-hover:visible">
        <span className="sr-only">삭제</span>
        <MinusIcon className="h-5 w-5" />
      </button>
    </li>
  )
}
