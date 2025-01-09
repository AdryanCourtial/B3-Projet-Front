import { io } from "socket.io-client";
import { QuizQuestionsResponseInterface } from "../types/quizQuestions";

export const getQuizQuestionsRequest = (): Promise<QuizQuestionsResponseInterface | null> => {
    const socket = io('http://localhost:4000');

    return new Promise((resolve, reject) => {

        socket.emit('getQuestions', {
            category: 'actu_politique',
            difficulty: 'difficile',
            gamemode: 'normal',
            limit: 4
        })
        
       socket.on('dataResponseQuiz', (data) => {

        if (!data) {
            reject()
        } 

        resolve(data)

        })
        
    })

}