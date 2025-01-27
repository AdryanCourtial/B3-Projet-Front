export interface QuestionStatistics {
    question: string;
    correctAnswer: string;
    stats: {
        choices: { [choice: string]: number }; 
        correct: number; 
    };
}
