import { useAtom } from "jotai";
import React from "react";
import { userPseudo } from "../../../../../atoms/UserAtoms";


interface Props {
    children: React.ReactNode
    username: string
}

const LobbyItemChat: React.FC<Props> = ({ children, username }) => {

const [uPseudo, _] = useAtom(userPseudo)

  return (
    <div className="flex flex-row max-w-full">
        <div className="w-fit">
            <p className="text-xl text-blue-700 pr-2 w-auto whitespace-nowrap">
                { username ===  uPseudo ? 'Vous :' : username + " :"}
            </p>
        </div>
        <div className="w-full">
            <p className="text-xl break-words">
                { children }
            </p>
        </div>
    </div>
  );
};

export default LobbyItemChat;
