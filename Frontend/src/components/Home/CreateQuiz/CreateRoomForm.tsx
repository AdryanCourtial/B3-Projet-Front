// CreateRoomForm.tsx
import { FC } from 'react';
import RoomForm from '../RoomForm/RoomForm';
import QuizParamsForm from '../QuizParam/QuizParamsForm';
import { QuizParams } from '../../../types/quiz.type';

interface CreateRoomFormProps {
  pseudo: string;
  setPseudo: React.Dispatch<React.SetStateAction<string>>;
  roomId: string;
  setRoomId: React.Dispatch<React.SetStateAction<string>>;
  isPrivate: boolean;
  setIsPrivate: React.Dispatch<React.SetStateAction<boolean>>;
  quizParams: QuizParams;
  setQuizParams: React.Dispatch<React.SetStateAction<QuizParams>>;
  createRoom: () => void;
}

const CreateRoomForm: FC<CreateRoomFormProps> = ({
  pseudo,
  setPseudo,
  roomId,
  setRoomId,
  isPrivate,
  setIsPrivate,
  quizParams,
  setQuizParams,
  createRoom,
}) => {
  return (
    <div>
      <RoomForm 
        pseudo={pseudo} 
        setPseudo={setPseudo} 
        roomId={roomId} 
        setRoomId={setRoomId} 
        isPrivate={isPrivate} 
        setIsPrivate={setIsPrivate} 
        createRoom={createRoom}
      />
      
      <QuizParamsForm quizParams={quizParams} setQuizParams={setQuizParams} />
    </div>
  );
};

export default CreateRoomForm;
