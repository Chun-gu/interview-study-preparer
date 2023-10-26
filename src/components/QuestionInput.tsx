import { useRef } from 'react'

import PlusIcon from '@/assets/icons/plus.svg'
import { generateRandomStringOfNumber } from '@/lib/utils'
import { useCreateQuestion } from '@/store'

import AutoResizingTextarea from './ui/AutoResizingTextarea'

export default function QuestionInput() {
  const questionInputRef = useRef<HTMLTextAreaElement>(null)
  const createQuestion = useCreateQuestion()

  function onClickCreateQuestion() {
    if (!questionInputRef.current) return

    const content = questionInputRef.current.value.trim()
    if (content.length === 0) return questionInputRef.current.focus()

    createQuestion({ id: generateRandomStringOfNumber(19), content })
    questionInputRef.current.value = ''
  }

  return (
    <div className="mb-1 flex gap-x-1">
      <AutoResizingTextarea
        ref={questionInputRef}
        name="question"
        rows={1}
        placeholder="질문 추가"
        className="grow resize-none self-stretch rounded-md bg-gray-100 px-2 py-1 placeholder:text-sm"
      />

      <button
        onClick={onClickCreateQuestion}
        className="self-start rounded-md bg-blue-200 p-1 hover:bg-blue-500 hover:text-white">
        <span className="sr-only">질문 추가</span>
        <PlusIcon className="h-5 w-5" />
      </button>
    </div>
  )
}
