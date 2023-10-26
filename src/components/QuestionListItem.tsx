import { useLayoutEffect, useRef, useState } from 'react'

import CheckIcon from '@/assets/icons/check.svg'
import MinusIcon from '@/assets/icons/minus.svg'
import PencilIcon from '@/assets/icons/pencil.svg'
import { useDeleteQuestion, useUpdateQuestion } from '@/store'

import AutoResizingTextarea from './ui/AutoResizingTextarea'

type Props = Question

export default function QuestionListItem({ id, content }: Props) {
  const [isEditing, setIsEditing] = useState(false)
  const questionTextareaInput = useRef<HTMLTextAreaElement>(null)

  const updateQuestion = useUpdateQuestion()
  const deleteQuestion = useDeleteQuestion()

  function onClickEdit() {
    setIsEditing(true)
  }

  function onClickComfirm() {
    if (!questionTextareaInput.current) return

    const newContent = questionTextareaInput.current.value.trim()
    if (newContent.length === 0) return questionTextareaInput.current.focus()

    updateQuestion({ id, content: newContent })
    setIsEditing(false)
  }

  function onClickDelete(id: string) {
    deleteQuestion(id)
  }

  useLayoutEffect(() => {
    if (isEditing) {
      const valueLength = questionTextareaInput.current?.value.length || null
      questionTextareaInput.current?.setSelectionRange(valueLength, valueLength)
      questionTextareaInput.current?.focus()
    }
  }, [isEditing])

  return (
    <li className="flex gap-x-1">
      <AutoResizingTextarea
        ref={questionTextareaInput}
        rows={1}
        name={id}
        defaultValue={content}
        disabled={!isEditing}
        className="block w-full resize-none rounded-md bg-gray-100 px-2 py-1"
      />

      {isEditing ? (
        <button
          onClick={onClickComfirm}
          className="self-start rounded-md bg-green-100 p-1 hover:bg-green-400 hover:text-white">
          <span className="sr-only">확정</span>
          <CheckIcon className="h-5 w-5" />
        </button>
      ) : (
        <button
          onClick={onClickEdit}
          className="self-start rounded-md bg-yellow-100 p-1 hover:bg-yellow-500 hover:text-white">
          <span className="sr-only">수정</span>
          <PencilIcon className="h-5 w-5" />
        </button>
      )}

      <button
        onClick={() => onClickDelete(id)}
        className="self-start rounded-md bg-red-100 p-1 hover:bg-red-500 hover:text-white">
        <span className="sr-only">질문 삭제</span>
        <MinusIcon className="h-5 w-5" />
      </button>
    </li>
  )
}
