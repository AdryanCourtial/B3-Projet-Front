import React from 'react';
import { QuizParams } from '../../../types/quiz.type';
import { useAtom } from 'jotai';
import { quizParamsData } from '../../../atoms/UserAtoms';


const QuizParamsForm: React.FC = () => {

  const [quizParams, setQuizParams] = useAtom(quizParamsData)
  const handleQuizParamChange = (e: React.ChangeEvent<HTMLInputElement>, param: keyof QuizParams) => {
    setQuizParams({
      ...quizParams,
      [param]: e.target.value
    });
  };

  return (
    <div>
      <label>Limit</label>
      <input
        type="number"
        value={quizParams.limit}
        onChange={(e) => handleQuizParamChange(e, 'limit')}
      />
      <label>Category</label>
      <input
        type="text"
        value={quizParams.category}
        onChange={(e) => handleQuizParamChange(e, 'category')}
      />
      <label>Difficulty</label>
      <input
        type="text"
        value={quizParams.difficulty}
        onChange={(e) => handleQuizParamChange(e, 'difficulty')}
      />
      <label>Gamemode</label>
      <input
        type="text"
        value={quizParams.gamemode}
        onChange={(e) => handleQuizParamChange(e, 'gamemode')}
      />
    </div>
  );
};

export default QuizParamsForm;
