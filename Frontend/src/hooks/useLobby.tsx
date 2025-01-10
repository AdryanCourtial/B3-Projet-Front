// useLobby.ts

import { useState, useEffect } from "react";
import { socket } from "../config/socket.config";
import { createRoom, getRooms, joinRoom, joinRoomByPin, startGame } from "../api/homeApi";
import { QuizParams } from "../types/quiz.type";
import { Room } from "../types/room.type";
import { useAtom } from "jotai";
import { currentviewEtat, etatRoom, pin, roomIdAtom, userPseudo, usersInRoomAtom } from "../atoms/UserAtoms";

const useLobby = () => {
  const [pseudo, setPseudo] = useAtom(userPseudo)
  const [roomId, setRoomId] = useAtom(roomIdAtom)
  const [quizParams, setQuizParams] = useState<QuizParams>({
    limit: 5,
    category: "tv_cinema",
    difficulty: "facile",
    gamemode: "classic",
  });
  const [availableRooms, setAvailableRooms] = useState<Room[]>([]);
  const [message, setMessage] = useState<string>("");
  const [usersInRoom, setUsersInRoom] = useAtom(usersInRoomAtom)
  const [isInRoom, setIsInRoom] = useAtom(etatRoom)
  const [isPrivate, setIsPrivate] = useState<boolean>(false);
  // const [roomPinDisplay, setRoomPinDisplay] = useState<string | null>(null);
  const [currentView, setCurrentView] = useAtom(currentviewEtat)
  const [, setRoomPinDisplay] = useAtom(pin)


  useEffect(() => {
    socket.on("availableRooms", (rooms: Room[]) => {
      setAvailableRooms(rooms);
    });

    socket.on("roomJoined", (data: { roomId: string; users: { pseudo: string; role: string  }[], roomPin: string | null }) => {
      setRoomId(data.roomId);
      setUsersInRoom(data.users);
      setRoomPinDisplay(data.roomPin)

    });

    socket.on("message", (data: string) => {
      setMessage(data);
    });

      socket.on("roomCreated", ({ roomId, roomPin }) => {
    console.log(`Room créée: ${roomId}`);

      setRoomPinDisplay(roomPin);
    });

    socket.on("updateUsers", (users: { pseudo: string; socketId: string; role: string }[]) => {
      setUsersInRoom(users);
    });

    socket.on("joinRoomResponse", (success: boolean, message: string) => {
      if (success) {
        setIsInRoom(true);
      } else {
        alert(message);
      }
    });

    socket.on("gameStarted", () => {
      setCurrentView("game");
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
      socket.off("availableRooms");
      socket.off("message");
      socket.off("roomJoined");
      socket.off("updateUsers");
      socket.off("roomCreated");
      socket.off("joinRoomResponse");
      socket.off("gameStarted");
      socket.off("hostChanged");
    };
  }, [setCurrentView]);

  // Fonction pour changer de vue
  const handleViewChange = (view: string) => {
    setCurrentView(view);
    if (view === "getRooms") {
      getRooms();
    }
  };

  // Fonction pour rejoindre une room
  const handleJoinRoom = (roomId: string, pseudo: string) => {
    joinRoom(roomId, pseudo);  
    setIsInRoom(true);
    setPseudo(pseudo)         
  };

  const handleJoinRoomByPin = (enteredPin: string) => {
    joinRoomByPin(enteredPin, pseudo);  
    setIsInRoom(true);                  
  };

  // Fonction pour créer une room
    const handleCreateRoom = () => {
    createRoom(roomId, pseudo, quizParams, isPrivate);  
    setIsInRoom(true); 

    setCurrentView('UserList');  
    };


  // Fonction pour démarrer le jeu
  const handleStartGame = () => {
    startGame(roomId);
    console.log('le jeu est lancer ')

  };

  const endRoom = (roomId: string) => {
    socket.emit('endRoom', roomId)
  }

  return {
    endRoom,
    availableRooms,
    currentView,
    handleViewChange,
    isInRoom,
    pseudo,
    setPseudo,
    quizParams,
    setQuizParams,
    roomId,
    usersInRoom,
    setIsPrivate,
    isPrivate,
    message,
    handleJoinRoom,
    handleJoinRoomByPin,
    handleCreateRoom,
    handleStartGame,
      setRoomId,
      createRoom,
      joinRoomByPin,
      joinRoom,
      startGame
    
  };
};

export default useLobby;
