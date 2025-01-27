// CreateRoomForm.tsx
import { FC } from 'react';
import RoomForm from './Form/RoomForm/RoomForm';
import QuizParamsForm from './Form/QuizParamsForm/QuizParamsForm';
import useLobby from '../../hooks/useLobby';
import "./CreateLobby.css"




const CreateLobby: FC = () => {

  const {handleCreateRoom} = useLobby()

  return (
    <div className='min-h-[100vh] page-public'>
      <div className='text-white text-center h-full'>
          <h1> Crée un Salon </h1>
      </div>
      <div className='content absolute left-[50%] top-[50%]  translate-x-[-50%] translate-y-[-50%] w-full max-w-[800px] p-4 flex flex-col items-center bg-white rounded-[10px] gap-4'>
        <RoomForm

          createRoom={handleCreateRoom}
        />
        
        <QuizParamsForm  />
      </div>
    </div>
  );
};

export default CreateLobby;


