import { useAtom } from 'jotai';
import React from 'react';
import { pin } from '../../../atoms/UserAtoms';

interface UserListProps {
  roomId: string;
  usersInRoom: { pseudo: string; role: string }[];
  // roomPinDisplay: string | null;
  startGame: () => void;
  endRoom: (roomId: string) => void;
  currentUserPseudo: string;
}


const UserList: React.FC<UserListProps> = ({ roomId, usersInRoom, startGame, currentUserPseudo, endRoom }) => {


const [roomPinDisplay] = useAtom(pin)

  return (
    <div>
      <h1>Room: {roomId}</h1>
      <h3>Utilisateurs dans la room :</h3>
      <ul>
        {usersInRoom.map((user, index) => (
          <li key={index}>
            {user.pseudo} ({user.role})
            {user.role === 'host' && user.pseudo === currentUserPseudo && (
              <>
                <button onClick={startGame}>Lancer le jeu</button>
                <button onClick={() => endRoom(roomId)}>Terminer la room</button> 
              </>
            )}
          </li>
        ))}
      </ul>
      {roomPinDisplay && <div>Pin de la room: {roomPinDisplay}</div>}
    </div>
  );
};

export default UserList;
