import React from 'react';
import { useAtom } from 'jotai';
import {   pin, roomIdAtom, userPseudo, usersInRoomAtom } from '../../atoms/UserAtoms';
import useLobby from '../../hooks/useLobby';


const Lobby: React.FC = () => {

const {handleStartGame, handleEndGame} = useLobby()

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
                <button onClick={handleStartGame}>Lancer le jeu</button>
                <button onClick={() => handleEndGame(roomId)}>Terminer la room</button> 
              </>
            )}
          </li>
        ))}
      </ul>
      {roomPinDisplay && <div>Pin de la room: {roomPinDisplay}</div>}
    </div>

  );
};

export default Lobby;
