import React from 'react';

interface UserListProps {
  roomId: string;
  usersInRoom: { pseudo: string; role: string }[];
  roomPinDisplay: string | null;
  startGame: () => void;
  currentUserPseudo: string;
}


const UserList: React.FC<UserListProps> = ({ roomId, usersInRoom, roomPinDisplay, startGame, currentUserPseudo }) => {

  return (
    <div>
      <h1>Room: {roomId}</h1>
      <h3>Utilisateurs dans la room :</h3>
      <ul>
        {usersInRoom.map((user, index) => (
          <li key={index}>
            {user.pseudo} ({user.role})
            {currentUserPseudo}
            {user.role === 'host' && user.pseudo === currentUserPseudo && (
              <button onClick={startGame}>Lancer le jeu</button>
            )}
          </li>
        ))}
      </ul>
      {roomPinDisplay && <div>Pin de la room: {roomPinDisplay}</div>}
    </div>
  );
};

export default UserList;
