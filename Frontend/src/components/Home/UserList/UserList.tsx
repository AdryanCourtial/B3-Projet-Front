import React from 'react';
import { useAtom } from 'jotai';
import {   pin, roomIdAtom, userPseudo, usersInRoomAtom } from '../../../atoms/UserAtoms';

interface UserListProps {
  startGame: () => void;
  endRoom: (roomId: string) => void;
}


const UserList: React.FC<UserListProps> = ({  startGame, endRoom }) => {
  const [roomId] = useAtom(roomIdAtom)

const [roomPinDisplay] = useAtom(pin)
const [usersInRoom] = useAtom(usersInRoomAtom)

  const [currentUserPseudo] = useAtom(userPseudo)

console.log("usersInRoom:", usersInRoom);
console.log("currentUserPseudo:", currentUserPseudo);

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
