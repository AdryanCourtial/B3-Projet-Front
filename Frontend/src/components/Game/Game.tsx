import { useAtom } from "jotai";
import { roomIdAtom, userPseudo, usersInRoomAtom } from "../../atoms/UserAtoms";

const Game: React.FC = () => {
  const [usersInRoom] = useAtom(usersInRoomAtom);
  const [roomId] = useAtom(roomIdAtom);
  const [pseudo] = useAtom(userPseudo)

  const currentUser = usersInRoom.find((user) => user.pseudo === pseudo);


  return (
    <div>
      <h1>Game in Room: {roomId}</h1>
      <div>

        <h2>{pseudo} Votre scrore:  {currentUser ? currentUser.points : 0}</h2>
        <h3>Utilisateurs en jeu :</h3>
        <ul>
          {usersInRoom.map((user, index) => (
            <li key={index}>
              {user.pseudo} ({user.role}) 
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Game;
