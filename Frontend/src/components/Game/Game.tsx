import { useAtom } from "jotai";
import {  isTimeUpAtom, remainingTimeAtom, roomIdAtom, userPseudo, usersInRoomAtom } from "../../atoms/UserAtoms";
import { motion } from "framer-motion";

const Game: React.FC = () => {
  const [usersInRoom] = useAtom(usersInRoomAtom);
  const [roomId] = useAtom(roomIdAtom);
  const [pseudo] = useAtom(userPseudo);
  const [isTimeUp] = useAtom(isTimeUpAtom);
  const [remainingTime] = useAtom(remainingTimeAtom);

  const currentUser = usersInRoom.find((user) => user.pseudo === pseudo);

  return (
    <div>
      <h1>Game in Room: {roomId}</h1>

      {/* Animation du temps restant */}
      <motion.h3
        key={remainingTime}  
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        exit={{ opacity: 0 }}     // Effet de disparition quand le temps est écoulé
        transition={{ duration: 0.5 }}
      >
        {isTimeUp ? "Temps écoulé" : `${remainingTime} secondes`}
      </motion.h3>

      <div>
        <h2>{pseudo} Votre score: {currentUser ? currentUser.points : 0}</h2>
      </div>

      <motion.div
        style={{
          width: "100%",
          height: "20px",
          backgroundColor: "#ddd",
          borderRadius: "10px",
        }}
      >
        <motion.div
          style={{
            height: "100%",
            backgroundColor: "#4caf50",
            borderRadius: "10px",
          }}
          animate={{
            width: `${(remainingTime / 30) * 100}%`, 
          }}
          transition={{ duration: 1 }}
        />
      </motion.div>
    </div>
  );
};

export default Game;
