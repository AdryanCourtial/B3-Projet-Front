import React from 'react';
import { useAtom } from 'jotai';
import {   pin, roomIdAtom, userPseudo, usersInRoomAtom } from '../../atoms/UserAtoms';
import useLobby from '../../hooks/useLobby';
import LobbyChat from './LobbyChat/LobbyChat';
import UserList from './UserList/UserList';
import "./Lobby.css"
import useVerifyReload from '../../hooks/useVerifyReload';



const Lobby: React.FC = () => {

const {handleStartGame, handleEndGame, VerifyHostUsersInRoom} = useLobby()

useVerifyReload()

const [roomId] = useAtom(roomIdAtom)

const [roomPinDisplay] = useAtom(pin)
  
const [usersInRoom] = useAtom(usersInRoomAtom)

  return (
    <div className='backgound_lobby'>
      <div className='mx-2 h-full'>
        <h1 className='w-full text-center text-white'> { roomId } </h1>
        <h2 className='w-full text-center text-white text-7xl my-10'>
          {roomPinDisplay && <div>{roomPinDisplay}</div>} 
        </h2>
        <div className='w-full flex lg:flex-row flex-col'>
          <div className='w-full bg-white/30 lg:w-[50%] backdrop-blur-3xl rounded-[10px] h-[300px] grid grid-cols-1 md:grid-cols-2 p-4'>
              <UserList />
          </div>
         { VerifyHostUsersInRoom() && <div className='lg:w-[30%] [&>button]:h-1/2 w-[300px] flex flex-row lg:flex-col'>
            <button className='bg-green-600/90' onClick={handleStartGame}> Lancer la partie </button>
            <button className='bg-red-600/90' onClick={ () => handleEndGame(roomId)}> Supprimé le Salon  </button>
          </div>}
        </div>
        <LobbyChat></LobbyChat>
      </div>
    </div>
  );
};

export default Lobby;
