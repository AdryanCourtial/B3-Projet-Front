import React, { useState } from 'react';
import { Room } from '../../../types/room.type';
import EnterPseudoForm from './EnterPseudoForm';

interface RoomListProps {
  availableRooms: Room[];
  joinRoom: (roomId: string, pseudo: string) => void;
}

const RoomList: React.FC<RoomListProps> = ({ availableRooms, joinRoom }) => {
  const [pseudo, setPseudo] = useState<string>(''); 
  const [isJoining, setIsJoining] = useState<boolean>(false);  // Si l'utilisateur a cliqué sur "Rejoindre"
  const [roomToJoin, setRoomToJoin] = useState<Room | null>(null);  // La room que l'utilisateur veut rejoindre

  const handleJoinClick = (room: Room) => {
    setRoomToJoin(room); 
    setIsJoining(true);  
  };

  const handlePseudoSubmit = () => {
    if (pseudo.trim()) {
      joinRoom(roomToJoin?.roomId || '', pseudo); // Rejoindre la room avec le pseudo
      setIsJoining(false);  // Cacher le formulaire de pseudo
    }
  };

  return (
  <ul>
    {availableRooms.map((room) => (
      room.roomPin === null ? (
        <li key={room.roomId}>  
          Room ID: {room.roomId} - {room.usersCount} joueurs
          <button onClick={() => handleJoinClick(room)}>Rejoindre</button>

          {isJoining && roomToJoin?.roomId === room.roomId && (
            <EnterPseudoForm 
              pseudo={pseudo} 
              setPseudo={setPseudo}
              onSubmit={handlePseudoSubmit} 
            />
          )}
        </li>
      ) : <p key={room.roomId}>Aucune Room de créée</p>  // Utilisation de room.roomId pour l'élément "aucune room"
    ))}
  </ul>

  );
};

export default RoomList;
