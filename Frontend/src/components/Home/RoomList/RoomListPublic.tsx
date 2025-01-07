import React, { useState } from 'react';
import { Room } from '../../../types/room.type';
import EnterPseudoForm from './EnterPseudoForm';  // Importer le formulaire de pseudo

interface RoomListProps {
  availableRooms: Room[];
  joinRoom: (roomId: string, pseudo: string) => void;
}

const RoomList: React.FC<RoomListProps> = ({ availableRooms, joinRoom }) => {
  const [pseudo, setPseudo] = useState<string>('');  // L'état pour le pseudo de l'utilisateur
  const [isJoining, setIsJoining] = useState<boolean>(false);  // Si l'utilisateur a cliqué sur "Rejoindre"
  const [roomToJoin, setRoomToJoin] = useState<Room | null>(null);  // La room que l'utilisateur veut rejoindre

  const handleJoinClick = (room: Room) => {
    setRoomToJoin(room);  // Sauvegarder la room que l'utilisateur veut rejoindre
    setIsJoining(true);  // Afficher le formulaire pour entrer le pseudo
  };

  const handlePseudoSubmit = () => {
    if (pseudo.trim()) {
      joinRoom(roomToJoin?.roomId || '', pseudo); // Rejoindre la room avec le pseudo
      setIsJoining(false);  // Cacher le formulaire de pseudo
    }
  };

  return (
    <ul>
      {availableRooms.map((room, index) => (
        <li key={index}>
          Room ID: {room.roomId} - {room.usersCount} joueurs
          <button onClick={() => handleJoinClick(room)}>Rejoindre</button>
          
          {/* Afficher le formulaire pour entrer un pseudo si l'utilisateur a cliqué sur "Rejoindre" */}
          {isJoining && roomToJoin?.roomId === room.roomId && (
            <EnterPseudoForm 
              pseudo={pseudo} 
              setPseudo={setPseudo} 
              onSubmit={handlePseudoSubmit} 
            />
          )}
        </li>
      ))}
    </ul>
  );
};

export default RoomList;
