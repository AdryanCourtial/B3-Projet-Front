import AnswerList from "./AnswerList/AnswerList";
import Question from "./Question/Question";
import { useGame } from "../../hooks/useGame";
import { useAtom } from "jotai";
import { questionAtom, questionIndexAtom, quizStatusAtom } from "../../atoms/gameAtom";
import Statistiques from "./Stats/Stats";
import Results from "./Results/Results";
import { userPseudo, usersInRoomAtom } from "../../atoms/UserAtoms";
import ProgressBar from "./ProgressBar/progressBar";


export default function Game() {

    const { nextQuestion, onAnswerPressed } = useGame()
    const [questions] = useAtom(questionAtom)
    const [questionIndex] = useAtom(questionIndexAtom)
    const [quizStatus] = useAtom(quizStatusAtom)
    const [usersInRoom] = useAtom(usersInRoomAtom)
    
    const [currentUserPseudo] = useAtom(userPseudo)
    

    return (
        <div className="max-h-screen h-screen">
            { quizStatus === 'question' ? (
            <div className="flex flex-col h-full">
                <ProgressBar />

                <Question>
                    { questions?.quizzes[questionIndex].question ?? 'Erreur lors du chargement de la questions !' }
                </Question>
                <AnswerList 
                onAnswerPressed={onAnswerPressed}
                />
                {usersInRoom.map((user, index) => (
                <li key={index}>
                    {user.role === 'host' && user.pseudo === currentUserPseudo && (
                    <>
                    <button onClick={nextQuestion}> Next </button>
                    </>
                    )}
                </li>
                ))}
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
  