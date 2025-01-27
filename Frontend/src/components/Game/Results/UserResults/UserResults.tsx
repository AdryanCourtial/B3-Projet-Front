import { useAtom } from "jotai";
import { usersInRoomAtom } from "../../../../atoms/UserAtoms";

interface UserResultsProps {
    onRestartGame: () => void;
    isHost: boolean;  
    gamemode: 'mort_subite' | 'normal';        
}

export default function UserResults({ onRestartGame, isHost, gamemode }: UserResultsProps) {
    const [usersInRoom] = useAtom(usersInRoomAtom);

    const sortedUsers = [...usersInRoom].sort((a, b) => b.points - a.points);
    const maxPoints = Math.max(...usersInRoom.map(user => user.points));
    const winners = usersInRoom.filter(user => user.points === maxPoints);

    const winnerMessage =
        gamemode === 'mort_subite'
            ? `Mode Hardcore terminé !`
            : winners.length > 1
                ? `Égalité entre ${winners.map(w => w.pseudo).join(", ")} !`
                : `${winners[0]?.pseudo} remporte la victoire ! 🏆`;

    return (
        <div className="flex flex-col items-center">
            <h3 className="text-xl font-semibold mb-4">{winnerMessage}</h3>
            <ul className="mb-6">
                {sortedUsers.map((user, index) => (
                    <li
                        key={index}
                        className={`text-lg ${
                            gamemode === 'mort_subite'
                                ? user.alive
                                    ? 'text-green-500 font-bold'
                                    : 'text-red-500'
                                : user.points === maxPoints
                                    ? 'text-green-500 font-bold'
                                    : 'text-gray-700'
                        }`}
                    >
                        {gamemode === 'mort_subite'
                            ? `#${index + 1} ${user.pseudo}: ${
                                user.alive
                                    ? 'En vie'
                                    : `Éliminé à la question ${user.points}`
                            }`
                            : `#${index + 1} ${user.pseudo}: ${user.points} points`}
                    </li>
                ))}
            </ul>

            <div className="flex space-x-4">
                {isHost && (
                    <button
                        onClick={onRestartGame}
                        className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-700"
                    >
                        Relancer le jeu
                    </button>
                )}
            </div>
        </div>
    );
}