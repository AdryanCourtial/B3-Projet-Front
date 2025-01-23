import { useEffect } from "react";
import { socket } from "../config/socket.config";
import { createRoom, endRoom, getRooms, joinRoom, joinRoomByPin, startGame } from "../api/homeApi";
import { Room } from "../types/room.type";
import { useAtom } from "jotai";
import { availableRoomsAtom, currentviewEtat, etatRoom, isPrivateAtom, isTimeUpAtom, messageServer, pin, quizParamsData, remainingTimeAtom, roomIdAtom, userPseudo, usersInRoomAtom } from "../atoms/UserAtoms";
import { useNavigate } from "react-router";

const useLobby = () => {
  const [pseudo, setPseudo] = useAtom(userPseudo)
  const [roomId, setRoomId] = useAtom(roomIdAtom)
  const [quizParams] = useAtom(quizParamsData)
  const [, setAvailableRooms] = useAtom(availableRoomsAtom)
  const [, setMessage] = useAtom(messageServer)
  const [usersInRoom, setUsersInRoom] = useAtom(usersInRoomAtom)
  const [, setIsInRoom] = useAtom(etatRoom)
  const [isPrivate] = useAtom(isPrivateAtom)
  const [, setCurrentView] = useAtom(currentviewEtat)
  const [, setRoomPinDisplay] = useAtom(pin)
  const [, setRemainingTime] = useAtom(remainingTimeAtom);
  const [, setIsTimeUp] = useAtom(isTimeUpAtom)

  // const [lisPublicRoom, setLisPublicRoom] = useAtom(lisPublicRoomAtom); 
  const navigate = useNavigate();

  useEffect(() => {


    socket.on('updateTimer', (data) => {
      setRemainingTime(data.remainingTime);
    });

    socket.on('timeUp', (message) => {
      setIsTimeUp(true);
      setMessage(message)
    });

    socket.on('gameEnded', (message) => {
      setMessage(message)
    });

    socket.on("availableRooms", (rooms: Room[]) => {
      setAvailableRooms(rooms);
      console.log("Je suis les rooms disponibles", availableRoomsAtom)
    });

    socket.on("roomJoined", (data: { success:boolean, roomId: string; users: { pseudo: string, role: string, points:number }[], roomPin: string | null }) => {
      setRoomId(data.roomId);
      setUsersInRoom(data.users);
      setRoomPinDisplay(data.roomPin)
      setIsInRoom(true);  
      navigate('/qibble/lobby');
                
    });

    socket.on("message", (data: string) => {
      setMessage(data);
    });
    
    socket.on('roomCreated', ({ roomId, roomPin, users }) => {
      console.log(`Room créée: ${roomId}`);
      setRoomPinDisplay(roomPin); 
      setUsersInRoom(users)
    });

    socket.on("updateUsers", (users: { pseudo: string, socketId: string, role: string, points:number }[]) => {
      setUsersInRoom(users);
    });

    socket.on("joinRoomResponse", (success: boolean, message: string) => {
      if (success) {
        setIsInRoom(true);
      } else {
        alert(message);
      }
    });

    socket.on("error", (errorMessage: { success: boolean, message: string }) => {
      if (!errorMessage.success) {
        setMessage(errorMessage.message);  
      }
    });

    socket.on("gameStarted", () => {
      setCurrentView("game");
      setRemainingTime(30);  
      setIsTimeUp(false);
      navigate('/qibble/game');

    });

    socket.on('roomEnded', (message) => {
      alert(message)
      setIsInRoom(false)
      setUsersInRoom([]);  
      setRoomId('');
    });

    socket.on("hostChanged", (newHostPseudo) => {
      setUsersInRoom((prevUsers) =>
        prevUsers.map((user) => {
          if (user.pseudo === newHostPseudo) {
            user.role = "host";
          } else if (user.role === "host") {
            user.role = "player";
          }
          return user;
        })
      );
    });

    return () => {
      socket.off('roomEnded');
      socket.off('error');
      socket.off("availableRooms");
      socket.off("message");
      socket.off("roomJoined");
      socket.off("updateUsers");
      socket.off("roomCreated");
      socket.off("joinRoomResponse");
      socket.off("gameStarted");
      socket.off("hostChanged");
    };
  }, [setCurrentView, setIsInRoom, setRoomId, setRoomPinDisplay, setUsersInRoom, setMessage, setAvailableRooms, setIsTimeUp, setRemainingTime]);

  const handleListRoom = () => {
    setMessage('')
    getRooms();
  };

  const handleJoinRoom = (roomId: string, pseudo: string) => {
    joinRoom(roomId, pseudo);  
    setPseudo(pseudo);         
  };

  const handleJoinRoomByPin = (enteredPin: string, pseudo: string) => {
    joinRoomByPin(enteredPin, pseudo);  
  };

  const handleCreateRoom = () => {
    console.log(roomId, pseudo, quizParams, isPrivate)
    createRoom(roomId, pseudo, quizParams, isPrivate);  
    setIsInRoom(true); 
    setPseudo(pseudo);         
    navigate('/qibble/lobby');
  };

  const handleStartGame = () => {
    startGame(roomId);
    console.log('le jeu est lancé');
  };

  const handleEndGame = (roomId: string) => {
    endRoom(roomId)
    setIsInRoom(false)
    console.log('le jeu est fini');
  };

  const VerifyHostUsersInRoom = () => {
    const user = usersInRoom.find((value) => value.pseudo === pseudo)

    console.log(user)
    if (user?.role === 'host') {
      return true
    } 

    return false
  }

  return {
    handleEndGame,
    handleListRoom,
    handleJoinRoom,
    handleJoinRoomByPin,
    handleCreateRoom,
    handleStartGame,
    VerifyHostUsersInRoom
  };
};

export default useLobby;
