import React from 'react';
import { useAtom } from 'jotai';
import { userPseudo, usersInRoomAtom } from '../../../atoms/UserAtoms';
import UserListItem from './UserListItem.tsx/UserListItem';



const UserList = () => {

const [usersInRoom] = useAtom(usersInRoomAtom)

const [currentUserPseudo] = useAtom(userPseudo)

console.log("usersInRoom:", usersInRoom);
console.log("currentUserPseudo:", currentUserPseudo);

  return (
    <div className=''>
        {usersInRoom.map((user, index) => (
          <UserListItem
          role={user.role}
          username={user.pseudo}
          key={index}
          />
        ))}
    </div>

  );
};

export default UserList;
