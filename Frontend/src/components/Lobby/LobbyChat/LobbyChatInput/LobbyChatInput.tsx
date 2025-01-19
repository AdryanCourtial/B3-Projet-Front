import { useAtom } from "jotai";
import React from "react";
import { useForm } from "react-hook-form";
import { userPseudo } from "../../../../atoms/UserAtoms";
import { ChatInterface } from "../../../../types/chat.interface";

interface Props {
  sendMessage: (data: ChatInterface) => void
}

// interface FormInterface {
//   message: string
// }


const LobbyChatInput: React.FC<Props> = ({ sendMessage }) => {

  const {register, handleSubmit , reset} = useForm()

  const [currentUserPseudo] = useAtom(userPseudo)

  const Submit = (data:any) => {

    if (data.message === '') return
    
    sendMessage({ 
      message: data.message,
      users: currentUserPseudo
    })
    reset()
  }

  return (
    <div className='input h-[25px] overscroll-y-auto'>
      <form className="flex flex-row px-4 justify-center items-center" onSubmit={handleSubmit(Submit)}>
          <input type="text" {...register("message")} />
          <input type="submit" value={"Send"}></input> 
      </form>
    </div>
  );
};

export default LobbyChatInput;