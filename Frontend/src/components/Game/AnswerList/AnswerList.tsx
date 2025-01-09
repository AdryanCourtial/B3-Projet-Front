import AnswerItems from "./AnswerItems/AnswerItem";
import { useAtom } from "jotai";
import { questionAtom, questionIndexAtom } from "../../../atoms/gameAtom";
import { shuffle } from "../../../services/utils";

export default function AnswerList({}) {
    
    const [questions] = useAtom(questionAtom)
    const [questionIndex]= useAtom(questionIndexAtom)

    const all_answer = questions?.quizzes[questionIndex].badAnswers.concat([questions?.quizzes[questionIndex].answer])


    return (
        <div className="grid bg-slate-500 border-[1px] border-blue-600 grid-cols-1 lg:grid-cols-2 p-6 gap-4 place-items-center flex-1 cursor-pointer">
            { questions &&
                shuffle<number>([0, 1, 2, 3]).map((index) => (
                <AnswerItems
                key={index}
                >
                    { all_answer && 
                        all_answer[index]
                    }
                </AnswerItems>
                ))
            }
        </div>
    )
  }
  