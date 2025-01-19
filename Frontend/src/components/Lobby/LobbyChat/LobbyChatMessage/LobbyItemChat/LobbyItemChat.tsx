import { useAtom } from "jotai";
import React from "react";
import { userPseudo } from "../../../../../atoms/UserAtoms";


interface Props {
    children: React.ReactNode
    username: string
}

const LobbyItemChat: React.FC<Props> = ({ children, username }) => {

const [uPseudo, setUserPseudo] = useAtom(userPseudo)

  return (
    <div className="flex flex-row px-4">
        <div className="w-[20%]">
            <p className="text-xl">
                { username ===  uPseudo ? 'Vous : ' : username + " :"}
            </p>
        </div>
        <div className="flex-1">
            <p className="text-xl">
                { children }
            </p>
        </div>
    </div>
  );
};

export default LobbyItemChat;
