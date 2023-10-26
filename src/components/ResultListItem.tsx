type Props = Result

export default function ResultListItem({ participant, questions }: Props) {
  return (
    <li className="flex gap-1">
      <span className="shrink-0 self-start p-2 font-bold">
        {participant.name}
      </span>
      <ul className="flex flex-col gap-1">
        {questions.map((question) => (
          <li
            key={question.id}
            className="shrink break-all rounded-md bg-gray-100 p-2">
            {question.content}
          </li>
        ))}
      </ul>
    </li>
  )
}
