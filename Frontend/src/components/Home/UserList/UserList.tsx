import React from 'react';

interface UserListProps {
  roomId: string;
  usersInRoom: string[];
  roomPinDisplay: string | null;
}

const UserList: React.FC<UserListProps> = ({ roomId, usersInRoom, roomPinDisplay }) => {
  return (
    <div>
      <h1>Room: {roomId}</h1>
      <h3>Utilisateurs dans la room :</h3>
      <ul>
        {usersInRoom.map((user, index) => (
          <li key={index}>{user}</li>
        ))}
      </ul>
      {roomPinDisplay && <div>Pin de la room: {roomPinDisplay}</div>}
    </div>
  );
};

export default UserList;
