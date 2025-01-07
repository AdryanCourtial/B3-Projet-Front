import { io } from "socket.io-client";
import { QuizQuestionsResponseInterface } from "../types/quizQuestions";

export const getQuizQuestionsRequest = async (): QuizQuestionsResponseInterface | null => {
    const socket = io('http://localhost:4000');

    let result: QuizQuestionsResponseInterface | null = null

    socket.emit('getQuestions', {
        category: 'actu_politique',
        difficulty: 'difficile',
        gamemode: 'normal',
        limit: 4
    })
    
    socket.on('dataResponseQuiz', async (data) => {
        console.log(data)
        result = data
    })

    return result

}