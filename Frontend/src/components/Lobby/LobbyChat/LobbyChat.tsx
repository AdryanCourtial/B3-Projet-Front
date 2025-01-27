import React from 'react';
import LobbyChatHeader from './LobbyChatHeader/LobbyChatMessage/LobbyChatHeader';
import LobbyChatInput from './LobbyChatInput/LobbyChatInput';
import LobbyChatMessage from './LobbyChatMessage/LobbyChatMessage';
import { useChat } from '../../../hooks/useChat';




const LobbyChat: React.FC = () => {

    const { sendMessage } = useChat()

  return (
    <div className='bg-slate-300 h-[300px] fixed left-4 bottom-4 right-4 max-w-[500px] flex flex-col rounded-[10px] border border-black'>
        <LobbyChatHeader></LobbyChatHeader>
        <LobbyChatMessage></LobbyChatMessage>
        <LobbyChatInput
        sendMessage={sendMessage}
        ></LobbyChatInput>
    </div>
  );
};

export default LobbyChat;
