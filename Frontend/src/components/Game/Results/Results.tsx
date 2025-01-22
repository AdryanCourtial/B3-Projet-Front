import { useAtom } from "jotai";
import { usersInRoomAtom } from "../../../atoms/UserAtoms";

export default function Results() {
    const [usersInRoom] = useAtom(usersInRoomAtom); 

    return (
        <div>
            <h2>Scores finaux</h2>
            <ul>
                {usersInRoom.map((user, index) => (
                    <li key={index}>
                        {user.pseudo}: {user.points} points
                    </li>
                ))}
            </ul>
        </div>
    );
}
