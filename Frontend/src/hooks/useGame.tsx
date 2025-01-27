    import { useAtom } from "jotai"
    import { useEffect } from "react"
    import { answerChoosedAtom, gameStatisticsAtom, questionAtom, questionIndexAtom, quizStatusAtom, randomizeArrayAswerAtom } from "../atoms/gameAtom"
    import {  useNavigate } from "react-router"
    import { socket } from "../config/socket.config"
    import { isAliveAtom, isTimeUpAtom, remainingTimeAtom, roomIdAtom, userPseudo, usersInRoomAtom } from "../atoms/UserAtoms"
    import { nextQuestionForTimer, restartGame, returnLobby } from "../api/gameApi"


    export const useGame = () => {

        const [questions, setQuestions] = useAtom(questionAtom)
        const [questionIndex, setQuestionIndex] = useAtom(questionIndexAtom)
        const [, setQuizStatus] = useAtom(quizStatusAtom)
        const [, setAnswerChoosed] = useAtom(answerChoosedAtom)
        const [, randomizeAnswer] = useAtom(randomizeArrayAswerAtom)
        const [user] = useAtom(userPseudo)
        const [roomId] = useAtom(roomIdAtom)
        const [remainingTime, setRemainingTime] = useAtom(remainingTimeAtom);
        const [, setIsTimeUp] = useAtom(isTimeUpAtom)
        const [, setUsersInRoom] = useAtom(usersInRoomAtom)

        const [, setGameStatistics] = useAtom(gameStatisticsAtom)
        const [, setIsAlive] = useAtom(isAliveAtom)
        const navigate = useNavigate()



        useEffect(() => {


            socket.on('playerEliminated', ({ message }) => {
                console.log(message);
                alert(message);

                setIsAlive(false); 
            });


            socket.on('gameOver', ({ message, statistics }) => {
                console.log(message); 
                setQuizStatus('finish'); 
                setGameStatistics(statistics); 

            });

            socket.on("gameRestarted", ({ roomState }) => {
                setQuizStatus("question");
                setQuestionIndex(roomState.currentQuestionIndex); 
                setAnswerChoosed('');
                setQuestions(roomState.questions);
                setRemainingTime(30);  
                setIsTimeUp(false);
                setIsAlive(true); 

                setUsersInRoom(roomState.users); 
                console.log("Le jeu a redémarré !");
            });

            socket.on("updateUsers", (users) => {
                setUsersInRoom(users);
              });

            socket.on("updateQuestion", ({ question, answers, index }) => {
                setQuestionIndex(index); 
                setRemainingTime(30);
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

            socket.on('quizFinished', ({ message, statistics }) => {
                console.log(message);
                console.log(statistics); 
        
                setQuizStatus('finish'); 
                setGameStatistics(statistics); 
            });
        
        
            return () => {
                socket.off("updateQuestion");
                socket.off('quizFinished');
                socket.off("updateUsers");
                socket.off("gameRestarted");
                socket.off('gameOver');

            };
        }, [
            setQuizStatus,
            setQuestionIndex,
            setAnswerChoosed,
            setQuestions,
            setRemainingTime,
            setIsTimeUp,
            setUsersInRoom,
            randomizeAnswer,
            setGameStatistics
        ]);
        
    

        const nextQuestion = () => {
            console.log('Questions:', questions);

            if (questions) {
                if (questionIndex < questions.quizzes.length - 1) {
                    handleNextQuestion(); 
                    console.log('Next Question Triggered:', questionIndex);

                } else {
                    console.log('Last Question Reached:', questionIndex);

                    handleNextQuestion(); 
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

    const handleRestartGame = () => {
        restartGame(roomId)
    }

    const handleLeaveRoom = () => {
        returnLobby(roomId)
        navigate('/'); 
    };


    return {
        handleNextQuestion,
        nextQuestion,
        onAnswerPressed,
        handleRestartGame,
        handleLeaveRoom
    };
};