export interface Quizzes {
    question: string;       
    answer: string;        
    badAnswers: string[]; 
    category: string;
    difficulty: string;
    stats: QuestionStats;
  }

export interface QuizData  {
    count: number,
    quizzes: Quizzes[]
}

export interface QuestionStats {
  correct: number;                
  choices: { [choice: string]: number }; 
}
