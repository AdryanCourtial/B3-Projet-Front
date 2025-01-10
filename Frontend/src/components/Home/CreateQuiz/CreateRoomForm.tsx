// CreateRoomForm.tsx
import { FC } from 'react';
import RoomForm from '../RoomForm/RoomForm';
import QuizParamsForm from '../QuizParam/QuizParamsForm';


interface CreateRoomFormProps {

  createRoom: () => void;
}

const CreateRoomForm: FC<CreateRoomFormProps> = ({
  createRoom,
}) => {

  
  return (
    <div>
      <RoomForm 

        createRoom={createRoom}
      />
      
      <QuizParamsForm  />
    </div>
  );
};

export default CreateRoomForm;
