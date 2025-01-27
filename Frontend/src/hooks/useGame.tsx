import { useAtom } from "jotai"
import { useEffect } from "react"
import { answerChoosedAtom, questionAtom, questionIndexAtom, quizStatusAtom, randomizeArrayAswerAtom } from "../atoms/gameAtom"
import { getQuizQuestionsRequest } from "../api/gameApi"
import useToaster from "./useToaster"

export const useGame = () => {

    const [questions, setQuestion] = useAtom(questionAtom)
    const [questionIndex, setQuestionIndex] = useAtom(questionIndexAtom)
    const [quizStatus, setQuizStatus] = useAtom(quizStatusAtom)
    const [, setAnswerChoosed] = useAtom(answerChoosedAtom)
    const [, randomizeAnswer] = useAtom(randomizeArrayAswerAtom)
    
    const { useToast } = useToaster()

    useEffect(() => {
        if (!questions) {
            startQuiz()
        }
    }, [])

    const nextQuestion = () => {
        if (questions) {
            if (questionIndex <= questions?.quizzes.length -1) {
                if (quizStatus === "question" && questionIndex !== questions?.quizzes.length -1) {
                    setQuestionIndex(questionIndex + 1)
                    randomizeAnswer()
                    setQuizStatus("stat")
                } else {
                    setQuizStatus('finish')
                }
                
                if (quizStatus === "stat"){
                    setQuizStatus('question')
                }
            } else {
                setQuizStatus('finish')
            }
        }
    }

    const startQuiz = () => {
        getQuizQuestionsRequest().then((data) => {
            setQuestion(data)
        }).catch(() => {
            console.log('Erreur lors de la récupérations des données')
        })
    }

    const onAnswerPressed = (answer: string) => {
        setAnswerChoosed(answer)
        useToast('erreur',  "WOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOW")
    }
    
    return {
        questions,
        nextQuestion,
        onAnswerPressed
    }
}