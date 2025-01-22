export interface Quizzes {
    question: string;       
    answer: string;        
    badAnswers: string[]; 
    category: string;
    difficulty: string;
  }

export interface QuizData  {
    count: number,
    quizzes: Quizzes[]
}