import { useAtom } from "jotai";
import {   roomIdAtom, userPseudo, usersInRoomAtom } from "../../atoms/UserAtoms";
import ProgressBar from "./ProgressBar/progressBar";

interface UserListProps {
  endRoom: (roomId: string) => void;
}

const Game: React.FC<UserListProps> = ({endRoom}) => {
  const [usersInRoom] = useAtom(usersInRoomAtom);
  const [roomId] = useAtom(roomIdAtom);
  const [pseudo] = useAtom(userPseudo);

  const [currentUserPseudo] = useAtom(userPseudo)
 

  const currentUser = usersInRoom.find((user) => user.pseudo === pseudo);

  return (
    <div>
      <h1>Game in Room: {roomId}</h1>
      <div>

        <h2>{pseudo} Votre score: {currentUser ? currentUser.points : 0}</h2>
        {currentUser?.role === 'host' && currentUser.pseudo === currentUserPseudo && (
              <>
                <button onClick={() => endRoom(roomId)}>Terminer la room</button> 
              </>
            )}

        
      </div>

      <ProgressBar />
    </div>
  );
};

export default Game;
