interface Props {
    children: string
}

export default function Question({ children }: Props) {
    return (
        <div className="flex-1 min-h-[50%] flex-col flex justify-center">
            <p className="w-full text-center font-bold text-3xl p-4"> { children } </p>
        </div>
    )
  }
  