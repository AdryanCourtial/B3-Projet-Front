interface Props {
    children: string
    onAnswerPressed: (answer: string) => void
}

export default function AnswerItems({ children, onAnswerPressed }: Props) {

    return (
        <div className="flex flex-row justify-center items-center bg-red-700 max-w-[500px] w-full h-[100%] rounded-[10px] lg:h-[100%] cursor-pointer"
        onClick={() => onAnswerPressed(children)}
        >
            <p>
                { children }
            </p>
        </div>
    )
  }
  