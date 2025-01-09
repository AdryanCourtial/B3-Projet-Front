import RoomList from './RoomList/RoomListPublic';
import UserList from './UserList/UserList';
import EnterPinForm from './RoomList/EnterPinForm';
import Header from '../Global/Header/Header';
import CreateRoomForm from './CreateQuiz/CreateRoomForm';
import Game from '../Game/Game';
import './Home.css'; // Importer le fichier CSS
import useLobby from '../../hooks/useLobby';

// const socket = io('http://localhost:4000');

const QuizApp = () => {
  const { availableRooms, currentView, handleViewChange, isInRoom, isPrivate, message, pseudo, quizParams, roomId, roomPinDisplay, setIsPrivate, setPseudo, setQuizParams, usersInRoom, createRoom, joinRoomByPin, setRoomId,joinRoom, startGame } = useLobby();

  const handleCreateRoom = () => {
    createRoom(roomId, pseudo, quizParams, isPrivate); 
  };

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
                    joinRoomByPin={joinRoomByPin} 
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
                <RoomList availableRooms={availableRooms} joinRoom={joinRoom} />
              )}
              <p>{message}</p>
            </>
          ) : (
            <UserList 
              roomId={roomId} 
              usersInRoom={usersInRoom} 
              roomPinDisplay={roomPinDisplay} 
              startGame={startGame} 
              currentUserPseudo={pseudo}
            />
          )}
        </>
      )}
    </div>
  );
};

export default QuizApp;
