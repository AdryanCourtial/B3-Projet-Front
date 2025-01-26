import AnswerList from "./AnswerList/AnswerList";
import Question from "./Question/Question";
import { useGame } from "../../hooks/useGame";
import { useAtom } from "jotai";
import { questionAtom, questionIndexAtom, quizStatusAtom } from "../../atoms/gameAtom";
import Results from "./Results/Results";
import { userPseudo, usersInRoomAtom } from "../../atoms/UserAtoms";
import ProgressBar from "./ProgressBar/progressBar";

export default function Game() {
    const { nextQuestion, onAnswerPressed } = useGame();
    const [questions] = useAtom(questionAtom);
    const [questionIndex] = useAtom(questionIndexAtom);
    const [quizStatus] = useAtom(quizStatusAtom);
    const [usersInRoom] = useAtom(usersInRoomAtom);
    const [currentUserPseudo] = useAtom(userPseudo);

    if (quizStatus === 'finish') {
        return (
                <Results />
        );
    }

    if (quizStatus === 'question') {
        return (
            <div className="max-h-screen h-screen flex flex-col">
                <ProgressBar />
                <Question>
                    {questions?.quizzes[questionIndex]?.question ?? 'Erreur lors du chargement de la question !'}
                </Question>
                <AnswerList onAnswerPressed={onAnswerPressed} />
                <ul>
                    {usersInRoom.map((user, index) => (
                        <li key={index}>
                            {user.role === 'host' && user.pseudo === currentUserPseudo && (
                                <button
                                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                                    onClick={nextQuestion}
                                >
                                    Next
                                </button>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        );
    }

    return (
        <div className="flex items-center justify-center h-screen">
            <p>Chargement...</p>
        </div>
    );
}
