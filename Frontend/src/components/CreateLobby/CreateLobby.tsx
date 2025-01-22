// CreateRoomForm.tsx
import { FC } from 'react';
import RoomForm from './Form/RoomForm';
import QuizParamsForm from './Form/QuizParamsForm';
import useLobby from '../../hooks/useLobby';




const CreateLobby: FC = () => {

  const {handleCreateRoom} = useLobby()

  return (
    <div>
      <RoomForm 

        createRoom={handleCreateRoom}
      />
      
      <QuizParamsForm  />
    </div>
  );
};

export default CreateLobby;


