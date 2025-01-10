import RoomList from './RoomList/RoomListPublic';
import UserList from './UserList/UserList';
import EnterPinForm from './RoomList/EnterPinForm';
import CreateRoomForm from './CreateQuiz/CreateRoomForm';
import Game from '../Game/Game';
import './Home.css'; // Importer le fichier CSS
import useLobby from '../../hooks/useLobby';
import { useAtom } from 'jotai';
import { currentviewEtat, etatRoom } from '../../atoms/UserAtoms';

const QuizApp = () => {
  const { handleEndGame, handleCreateRoom, handleJoinRoomByPin, handleJoinRoom, handleStartGame, handleViewChange } = useLobby();
  const [currentView] = useAtom(currentviewEtat)
  const [isInRoom] = useAtom(etatRoom)
  
  return (
    <div className="quiz-app">

      {/* Contrôle de la vue */}
      {currentView === 'game' ? (
        <Game/>
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
                    joinRoomByPin={handleJoinRoomByPin} 
                  />
                </div>
              )}

              {currentView === 'createRoom' && (
                <CreateRoomForm 
     
                  createRoom={handleCreateRoom} 
                />
              )}

              {currentView === 'getRooms' && (
                <RoomList  joinRoom={handleJoinRoom} />
              )}
            </>
          ) : (
            <UserList 
              startGame={handleStartGame} 
              endRoom={handleEndGame}
            />
          )}
        </>
      )}
    </div>
  );
};

export default QuizApp;
