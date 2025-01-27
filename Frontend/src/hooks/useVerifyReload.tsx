import { useAtom } from "jotai"
import { useEffect } from "react"
import { useNavigate } from "react-router";
import { roomIdAtom, usersInRoomAtom } from "../atoms/UserAtoms";


const useVerifyReload = () => {
    
    const navigate = useNavigate();
    const [roomId,] = useAtom(roomIdAtom)

    
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {

      event.preventDefault();
      event.returnValue = ''; 
    };
    
    useEffect(() => {
    
        window.addEventListener('beforeunload', handleBeforeUnload);
    
        return () => {
          window.removeEventListener('beforeunload', handleBeforeUnload);
        };
      }, []);

    useEffect(() => {
    if (!roomId) {
        navigate('/')
    }
    }, [roomId])
}

export default useVerifyReload