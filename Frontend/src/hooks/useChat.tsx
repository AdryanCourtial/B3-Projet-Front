import { useEffect } from "react"
import { socket } from "../config/socket.config"
import { onMessage } from "../api/homeApi"
import { useAtom } from "jotai"
import { inputChatAtom } from "../atoms/chatAtom"
import { ChatInterface } from "../types/chat.interface"


export const useChat = () => {

    const [inputChat, setInputChat] = useAtom(inputChatAtom)

    useEffect(() => {
        socket.on("onMessage", (data: ChatInterface) => {
            setInputChat((inputChat) => [...inputChat, data])
        })

        return () => {
            socket.off('onMessage');
        };
    }, [socket])

    const sendMessage = (data: ChatInterface) => {
        onMessage(data.message, data.users)
        setInputChat((inputChat) => [...inputChat, data])
    }

    return {
        sendMessage
    }
}