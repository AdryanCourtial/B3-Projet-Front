import AnswerItems from "./AnswerItems/AnswerItem";
import { useAtom } from "jotai";
import { arrayRandomizeAtom, questionAtom, questionIndexAtom } from "../../../atoms/gameAtom";

interface Props {
    onAnswerPressed: (answer: string) => void
}

export default function AnswerList({ onAnswerPressed }: Props) {
    
    const [questions] = useAtom(questionAtom)
    const [questionIndex]= useAtom(questionIndexAtom)
    const [arrayRandomize] = useAtom(arrayRandomizeAtom)

    const all_answer = questions?.quizzes[questionIndex].badAnswers.concat([questions?.quizzes[questionIndex].answer])


    return (
        <div className="grid bg-slate-500 border-[1px] border-blue-600 grid-cols-1 lg:grid-cols-2 p-6 gap-4 place-items-center flex-1">
            { questions &&
                arrayRandomize.map((index) => (
                <AnswerItems
                key={index}
                onAnswerPressed={onAnswerPressed}
                >
                    { all_answer ? (

                        all_answer[index] ?? ""
                    ) : ""
                    }
                </AnswerItems>
                ))
            }
        </div>
    )
  }
  