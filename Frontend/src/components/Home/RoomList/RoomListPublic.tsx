import React, { useState } from 'react';
import { Room } from '../../../types/room.type';
import EnterPseudoForm from './EnterPseudoForm';
import { useAtom } from 'jotai';
import { availableRoomsAtom, messageServer, userPseudo } from '../../../atoms/UserAtoms';

interface RoomListProps {
  joinRoom: (roomId: string, pseudo: string) => void;
}

const RoomList: React.FC<RoomListProps> = ({ joinRoom }) => {
  const [availableRooms] = useAtom(availableRoomsAtom)
  const [pseudo] = useAtom(userPseudo)
  const [isJoining, setIsJoining] = useState<boolean>(false);  
  const [roomToJoin, setRoomToJoin] = useState<Room | null>(null); 
  const [message] = useAtom(messageServer)

  const handleJoinClick = (room: Room) => {
    setRoomToJoin(room); 
    setIsJoining(true);  
  };

  const handlePseudoSubmit = () => {
    if (pseudo.trim()) {
      joinRoom(roomToJoin?.roomId || '', pseudo); 
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

export default RoomList;
