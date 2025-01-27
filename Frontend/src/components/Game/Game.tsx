import AnswerList from "./AnswerList/AnswerList";
import Question from "./Question/Question";
import { useGame } from "../../hooks/useGame";
import { useAtom } from "jotai";
import { questionAtom, questionIndexAtom, quizStatusAtom } from "../../atoms/gameAtom";
import Statistiques from "./Stats/Stats";
import Results from "./Results/Results";
import useVerifyReload from "../../hooks/useVerifyReload";


export default function Game({  }) {

    useVerifyReload()
    const { nextQuestion, onAnswerPressed } = useGame()
    const [questions] = useAtom(questionAtom)
    const [questionIndex] = useAtom(questionIndexAtom)
    const [quizStatus] = useAtom(quizStatusAtom)

    return (
        <div className="max-h-screen h-screen">
            { quizStatus === 'question' ? (
            <div className="flex flex-col h-full">
                <Question>
                    { questions?.quizzes[questionIndex].question ?? 'Erreur lors du chargement de la questions !' }
                </Question>
                <AnswerList 
                onAnswerPressed={onAnswerPressed}
                />
                <button onClick={nextQuestion}>Next</button>
            </div>
            ) : quizStatus === 'stat' ? (
            <div>
                <Statistiques />
                <button onClick={nextQuestion}> Next </button>
            </div>
            ) :
            <div>
                <Results />
            </div>
            }
        </div>
    )
  }
  