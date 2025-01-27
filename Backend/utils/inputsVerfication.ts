import { QuizParams } from "../types/quizParameter.interface";

export const VerifQuizInput = (QuizParams: QuizParams): Boolean => {
    try {
        if (typeof QuizParams.category != 'string') throw Error('La Catégory n\'est pas valide')
        if (typeof QuizParams.difficulty != 'string') throw Error('La Difficuté n\'est pas valide')
        if (typeof QuizParams.gamemode != 'string') throw Error('Le Mode de jeux n\'est pas valide')
        if (typeof QuizParams.limit != 'number') throw Error('La Limit n\'est pas valide')

        return true

    } catch (error) {
        console.log(error)
        return false
    }
 // ZOD
}