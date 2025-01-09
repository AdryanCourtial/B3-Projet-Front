import { useAtom } from "jotai"
import { useEffect } from "react"
import { questionAtom, questionIndexAtom, quizStatusAtom } from "../atoms/gameAtom"
import { getQuizQuestionsRequest } from "../api/gameApi"

export const useGame = () => {

    const [questions, setQuestion] = useAtom(questionAtom)
    const [questionIndex, setQuestionIndex] = useAtom(questionIndexAtom)
    const [ quizStatus, setQuizStatus ] = useAtom(quizStatusAtom)

    useEffect(() => {
        if (!questions) {
            startQuiz()
        }
    }, [])

    const nextQuestion = () => {
        console.log(questionIndex, questions?.quizzes.length)
        if (questions) {
            if (questionIndex <= questions?.quizzes.length -1) {
                if (quizStatus === "question" && questionIndex !== questions?.quizzes.length -1) {
                    setQuestionIndex(questionIndex + 1)
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
    
    return {
        questions,
        nextQuestion
    }
}