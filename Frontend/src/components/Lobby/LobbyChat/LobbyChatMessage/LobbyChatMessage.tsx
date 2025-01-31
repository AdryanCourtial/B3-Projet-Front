import { useAtom } from 'jotai';
import { FC, useEffect, useRef } from 'react';
import { inputChatAtom } from '../../../../atoms/chatAtom';
import LobbyItemChat from './LobbyItemChat/LobbyItemChat';




const LobbyChatMessage: FC = () => {

  const [inputChat, setchatChat] = useAtom(inputChatAtom)

  const chatBoxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [inputChat]);
  

  return (
    <div className='chat-box bg-white/30 flex-1 h-[500px] overscroll-auto overflow-auto py-4 px-4 overscroll-x-none break-words overflow-x-hidden'
    ref={chatBoxRef}>
        {
          inputChat.map((value, index) => (
              <LobbyItemChat
              username={value.users}
              key={index}
              > { value.message } </LobbyItemChat>
          ))
        }
    </div>
  );
};

export default LobbyChatMessage;
