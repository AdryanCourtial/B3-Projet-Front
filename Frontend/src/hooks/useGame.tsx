import { useAtom } from "jotai"
import { useEffect } from "react"
import { questionAtom } from "../atoms/gameAtom"
import { getQuizQuestionsRequest } from "../api/gameApi"

export const useGame = () => {

    const [questions, setQuestionAtom] = useAtom(questionAtom)

    useEffect(() => {
        if (!questions) {
            setQuestionAtom(getQuizQuestionsRequest())
        } 
    }, [])
    
    return {
        questions
    }
}