import { useAtom } from "jotai"
import { answerChoosedAtom } from "../../../../atoms/gameAtom"

interface Props {
    children: string
    onAnswerPressed: (answer: string) => void
}

export default function AnswerItems({ children, onAnswerPressed }: Props) {

    const [answerChoosed] = useAtom(answerChoosedAtom)

    return (
        <div className="flex flex-row justify-center items-center bg-red-700 max-w-[500px] w-full h-[100%] rounded-[10px] lg:h-[100%] cursor-pointer"
        style={{
            opacity: !answerChoosed || children === answerChoosed ? '100%' : '60%'
        }}
        onClick={ !answerChoosed ? () => onAnswerPressed(children) : undefined}
        >
            <p>
                { children }
            </p>
        </div>
    )
  }
  