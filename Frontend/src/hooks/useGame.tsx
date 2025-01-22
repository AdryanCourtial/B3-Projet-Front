    import { useAtom } from "jotai"
    import { useEffect } from "react"
    import { answerChoosedAtom, questionAtom, questionIndexAtom, quizStatusAtom, randomizeArrayAswerAtom } from "../atoms/gameAtom"
    // import { getQuizQuestionsRequest } from "../api/gameApi"
    import useToaster from "./useToaster"
    import { redirect } from "react-router"
    import { socket } from "../config/socket.config"
    import { string } from "three/webgpu"
    import { isTimeUpAtom, remainingTimeAtom, roomIdAtom, userPseudo, usersInRoomAtom } from "../atoms/UserAtoms"
    import { nextQuestionForTimer } from "../api/gameApi"


    export const useGame = () => {

        const [questions, setQuestions] = useAtom(questionAtom)
        const [questionIndex, setQuestionIndex] = useAtom(questionIndexAtom)
        const [quizStatus, setQuizStatus] = useAtom(quizStatusAtom)
        const [answerChoosed, setAnswerChoosed] = useAtom(answerChoosedAtom)
        const [, randomizeAnswer] = useAtom(randomizeArrayAswerAtom)
        const [user] = useAtom(userPseudo)
        const [roomId] = useAtom(roomIdAtom)
        const [remainingTime] = useAtom(remainingTimeAtom);
        const [, setIsTimeUp] = useAtom(isTimeUpAtom)
        const [, setRemainingTime] = useAtom(remainingTimeAtom);
        const [, setUsersInRoom] = useAtom(usersInRoomAtom)


        const { useToast } = useToaster()

        useEffect(() => {

            socket.on("updateUsers", (users) => {
                setUsersInRoom(users);
              });

            socket.on("updateQuestion", ({ question, answers, index }) => {
                setQuestionIndex(index); 
                setIsTimeUp(false);
                setAnswerChoosed('');

                setQuestions((prev) => {
                    if (!prev) {
                        return null; 
                    }
        
                    return {
                        ...prev,
                        quizzes: prev.quizzes.map((q, i) =>
                            i === index ? { ...q, question, answers } : q
                        ),
                    };
                });
                randomizeAnswer(); 
            });

            socket.on('quizFinished', () => {
                setQuizStatus('finish'); 
            });
        
            return () => {
                socket.off("updateQuestion");
                socket.off('quizFinished');
                socket.off("updateUsers");


            };
        }, [setQuestionIndex, setQuestions, randomizeAnswer, setQuizStatus, setUsersInRoom]);
        
    

    const nextQuestion = () => {
        if (questions) {
            if (questionIndex < questions.quizzes.length - 1) {
                if (quizStatus === "question") {
                    setQuizStatus("stat");
                } else if (quizStatus === "stat") {
                    handleNextQuestion(); 
                    setQuizStatus("question");
                }
            } else {
                setQuizStatus("finish");
            }
        }
    };

    const onAnswerPressed = (answer: string) => {
        setAnswerChoosed(answer);
        socket.emit("verifAnswer", {
            roomId,
            answer,
            user,
            questionIndex,
            timeStamp: remainingTime,
        });
    };

    const handleNextQuestion = () => {
        nextQuestionForTimer(roomId); 
        setIsTimeUp(false);
    };

    return {
        handleNextQuestion,
        nextQuestion,
        onAnswerPressed,
    };
};