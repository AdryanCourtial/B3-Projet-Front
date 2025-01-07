import React from 'react';
import { Room } from '../Home';

interface RoomListProps {
  availableRooms: Room[];
  joinRoom: (roomId: string, pin: string | null) => void;
}

const RoomList: React.FC<RoomListProps> = ({ availableRooms, joinRoom }) => {
  return (
    <ul>
      {availableRooms.map((room, index) => (
        room.roomPin === null ? ( // Affiche seulement les rooms publiques
          <li key={index}>
            Room ID: {room.roomId} - {room.usersCount} joueurs
            <button onClick={() => joinRoom(room.roomId, null)}>Rejoindre</button>
          </li>
        ) : null
      ))}
    </ul>
  );
};

export default RoomList;
