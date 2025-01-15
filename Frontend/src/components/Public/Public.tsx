import React, {  useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import { availableRoomsAtom, messageServer, userPseudo } from '../../atoms/UserAtoms';
import { Room } from '../../types/room.type';
import EnterPseudoForm from './EnterPseudoForm';
import useLobby from '../../hooks/useLobby';





const Public: React.FC = () => {

  const {handleListRoom} = useLobby()

  useEffect(()=>{
    handleListRoom()
  }),[handleListRoom]

  const {  handleJoinRoom  } = useLobby();

  const [availableRooms] = useAtom(availableRoomsAtom)
  const [pseudo] = useAtom(userPseudo)
  const [isJoining, setIsJoining] = useState<boolean>(false);  
  const [roomToJoin, setRoomToJoin] = useState<Room | null>(null); 

console.log('Available Rooms:', availableRooms);
  const [message] = useAtom(messageServer)

  const handleJoinClick = (room: Room) => {
    setRoomToJoin(room); 
    setIsJoining(true);  
  };

  const handlePseudoSubmit = () => {
    if (pseudo.trim()) {
      handleJoinRoom(roomToJoin?.roomId || '', pseudo); 
      setIsJoining(false);  
    }
  };

  return (
    <div>
      <ul>
        {availableRooms.map((room) => (
          room.roomPin === null ? (
            <li key={room.roomId}>  
              Room ID: {room.roomId} - {room.usersCount} joueurs
              <button onClick={() => handleJoinClick(room)}>Rejoindre</button>

              {isJoining && roomToJoin?.roomId === room.roomId && (
                <EnterPseudoForm 
                  onSubmit={handlePseudoSubmit} 
                />
              )}
            </li>
          ) : null
        ))}
      </ul>

      {message && <p style={{ color: 'red' }}>{message}</p>}
    </div>
  );
};

export default Public;
