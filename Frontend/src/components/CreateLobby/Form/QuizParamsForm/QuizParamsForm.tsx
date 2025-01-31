import React from 'react';
import { useAtom } from 'jotai';
import { quizParamsData } from '../../../../atoms/UserAtoms';
import { QuizCategory, QuizDifficulty, QuizGameMode } from '../../../../types/quiz.enum'; // Assure-toi que les enums sont bien importés
import { QuizParams } from '../../../../types/quiz.type';
import "./QuizParamsForm.css"


const QuizParamsForm: React.FC = () => {
  const [quizParams, setQuizParams] = useAtom(quizParamsData);

  const handleQuizParamChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>, param: keyof QuizParams) => {
    const value = param === 'limit' ? parseInt(e.target.value, 10) : e.target.value;
    
    setQuizParams({
      ...quizParams,
      [param]: value
    });
  };

  return (
    <div className='formulaire_create'>
      <div className='div_params'>
        <div>
          <label>Limit</label>
        </div>
        <input
          type="number"
          placeholder="Max 10"
          value={quizParams.limit}
          onChange={(e) => handleQuizParamChange(e, 'limit')}
          max={10}
          min={1}
        />
      </div>

      <div className='div_params'>
        <div>
          <label>Category</label>
        </div>
        <select
          value={quizParams.category}
          onChange={(e) => handleQuizParamChange(e, 'category')}
        >
          {Object.keys(QuizCategory).map((key) => (
            <option key={key} value={QuizCategory[key as keyof typeof QuizCategory]}>
              {QuizCategory[key as keyof typeof QuizCategory]}
            </option>
          ))}
        </select>
      </div>

      <div className='div_params'>
        <div>
          <label>Difficulty</label>
        </div>
        <select
          value={quizParams.difficulty}
          onChange={(e) => handleQuizParamChange(e, 'difficulty')}
          >
          {Object.keys(QuizDifficulty).map((key) => (
            <option key={key} value={QuizDifficulty[key as keyof typeof QuizDifficulty]}>
              {QuizDifficulty[key as keyof typeof QuizDifficulty]}
            </option>
          ))}
        </select>
      </div>

      <div className='div_params'>
        <div>
          <label>Gamemode</label>
        </div>
        <select
          value={quizParams.gamemode}
          onChange={(e) => handleQuizParamChange(e, 'gamemode')}
        >
          {Object.keys(QuizGameMode).map((key) => (
            <option key={key} value={QuizGameMode[key as keyof typeof QuizGameMode]}>
              {QuizGameMode[key as keyof typeof QuizGameMode]}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default QuizParamsForm;
