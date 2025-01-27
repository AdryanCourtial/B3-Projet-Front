
import { useGame } from "../../../hooks/useGame";
import { motion } from "framer-motion";
import GameStatistics from "./GameStatistics/GameStatistics";
import UserResults from "./UserResults/UserResults";
import { useAtom } from "jotai";
import { roomGamemodeAtom } from "../../../atoms/gameAtom";
import { userPseudo, usersInRoomAtom } from "../../../atoms/UserAtoms";

export default function Results() {
    const { handleRestartGame, handleLeaveRoom } = useGame();
    const [gamemode] = useAtom(roomGamemodeAtom);
    const [usersInRoom] = useAtom(usersInRoomAtom);
    const [currentUserPseudo] = useAtom(userPseudo);


    const isHost = usersInRoom.some(user => user.pseudo === currentUserPseudo && user.role === "host");
    
    return (
        
        <div className="flex flex-col items-center justify-center h-screen">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
            >
                <h2 className="text-2xl font-bold mb-4">Scores finaux</h2>
            </motion.div>
            <UserResults onRestartGame={handleRestartGame} isHost={isHost}  gamemode={gamemode}/>
            <button
                onClick={handleLeaveRoom}
                className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-700 mt-4"
            >
                Retour au menu principal
            </button>
            <GameStatistics />
        </div>
    );
}
