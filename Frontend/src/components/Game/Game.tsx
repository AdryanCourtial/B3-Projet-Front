import AnswerList from "./AnswerList/AnswerList";
import Question from "./Question/Question";
import { useGame } from "../../hooks/useGame";


export default function Game() {

    const { questions } = useGame()

    return (
        <>
            <Question />
            <AnswerList />
            {questions &&
            <h2>
                You have {questions.quizzes[0].answer} unread messages.
            </h2>
            }
            <h1>
                SALUT
            </h1>
        </>
    )
  }
  