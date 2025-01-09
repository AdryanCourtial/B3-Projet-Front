interface Props {
    children: string | undefined
}

export default function AnswerItems({ children }: Props) {
    return (
        <div className="flex flex-row justify-center items-center bg-red-700 max-w-[500px] w-full h-[100%] rounded-[10px] lg:h-[100%]">
            <p>
                { children }
            </p>
        </div>
    )
  }
  