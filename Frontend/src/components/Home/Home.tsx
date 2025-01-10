import RoomList from './RoomList/RoomListPublic';
import UserList from './UserList/UserList';
import EnterPinForm from './RoomList/EnterPinForm';
import Header from '../Global/Header/Header';
import CreateRoomForm from './CreateQuiz/CreateRoomForm';
import Game from '../Game/Game';
import './Home.css'; // Importer le fichier CSS
import useLobby from '../../hooks/useLobby';
import { useAtom } from 'jotai';
import { currentviewEtat, roomIdAtom } from '../../atoms/UserAtoms';

// const socket = io('http://localhost:4000');

const QuizApp = () => {
  const { handleCreateRoom,endRoom, handleJoinRoomByPin, handleJoinRoom, handleStartGame,availableRooms, handleViewChange, isInRoom, isPrivate, message, pseudo, quizParams, setIsPrivate, setPseudo, setQuizParams, usersInRoom, setRoomId } = useLobby();

  const [currentView] = useAtom(currentviewEtat)
  const [roomId] = useAtom(roomIdAtom)
console.log(currentView)
  return (
    <div className="quiz-app">
      <Header />

      {/* Contrôle de la vue */}
      {currentView === 'game' ? (
        <Game roomId={roomId} usersInRoom={usersInRoom} />
      ) : (
        <>
          {!isInRoom ? (
            <>
              <div className="buttons">
                <button onClick={() => handleViewChange('joinRoomByPin')}>Rejoindre une room privé</button>
                <button onClick={() => handleViewChange('createRoom')}>Créer une room</button>
                <button onClick={() => handleViewChange('getRooms')}>Voir les rooms</button>
              </div>

              {currentView === 'joinRoomByPin' && (
                <div className="join-room-form">
                  <EnterPinForm 
                    pseudo={pseudo} 
                    setPseudo={setPseudo} 
                    joinRoomByPin={handleJoinRoomByPin} 
                  />
                </div>
              )}

              {currentView === 'createRoom' && (
                <CreateRoomForm 
                  pseudo={pseudo} 
                  setPseudo={setPseudo} 
                  roomId={roomId} 
                  setRoomId={setRoomId} 
                  isPrivate={isPrivate} 
                  setIsPrivate={setIsPrivate} 
                  quizParams={quizParams} 
                  setQuizParams={setQuizParams} 
                  createRoom={handleCreateRoom} // Passer la nouvelle fonction ici
                />
              )}

              {currentView === 'getRooms' && (
                <RoomList availableRooms={availableRooms} joinRoom={handleJoinRoom} />
              )}
              <p>{message}</p>
            </>
          ) : (
            <UserList 
              startGame={handleStartGame} 
              endRoom={endRoom}
            />
          )}
        </>
      )}
    </div>
  );
};

export default QuizApp;
