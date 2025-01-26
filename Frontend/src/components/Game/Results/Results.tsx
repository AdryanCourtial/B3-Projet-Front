import { useAtom } from "jotai";
import { usersInRoomAtom, userPseudo, roomIdAtom } from "../../../atoms/UserAtoms";
import { socket } from "../../../config/socket.config";
import { useGame } from "../../../hooks/useGame";

export default function Results() {
    const [usersInRoom] = useAtom(usersInRoomAtom); // Liste des utilisateurs dans la room
    const [currentUserPseudo] = useAtom(userPseudo); // Pseudo de l'utilisateur actuel
    const [roomId] = useAtom(roomIdAtom); // ID de la room actuelle

    const {handleRestartGame} = useGame()

    // Fonction pour émettre l'événement de redémarrage
    // const restartGame = () => {
    //     socket.emit("restartGame", roomId);
    // };

    // Vérifie si l'utilisateur actuel est l'hôte
    const isHost = usersInRoom.some(user => user.pseudo === currentUserPseudo && user.role === "host");

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h2 className="text-2xl font-bold mb-4">Scores finaux</h2>
            <ul className="mb-6">
                {usersInRoom.map((user, index) => (
                    <li key={index} className="text-lg">
                        {user.pseudo}: {user.points} points
                    </li>
                ))}
            </ul>
            {isHost && (
                <button
                    onClick={handleRestartGame}
                    className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-700"
                >
                    Relancer le jeu
                </button>
            )}
        </div>
    );
}
