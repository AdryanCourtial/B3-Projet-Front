import { useAtom } from 'jotai';
import { currentviewEtat, etatRoom } from '../../atoms/UserAtoms';
import EnterPinForm from './RoomList/EnterPinForm'; // Composant Enfant
import CreateRoomForm from './CreateQuiz/CreateRoomForm'; // Composant Enfant
import RoomList from './RoomList/RoomListPublic'; // Composant Enfant
import UserList from './UserList/UserList'; // Composant Enfant
import Game from '../Game/Game'; // Composant Enfant
import useLobby from '../../hooks/useLobby';

const QuizApp = () => {
  const { handleEndGame, handleCreateRoom, handleJoinRoomByPin, handleJoinRoom, handleStartGame, handleViewChange } = useLobby();
  const [currentView] = useAtom(currentviewEtat);
  const [isInRoom] = useAtom(etatRoom);

  return (
    <div className="quiz-app max-w-5xl mx-auto p-6">
      {/* Contrôle de la vue */}
      {currentView === 'game' ? (
        <Game /> // ICI une redirection vers Game 
      ) : (
        <>
          {!isInRoom ? (
              <>
              <div className="button-container flex gap-4 mb-6 justify-center">
                <button onClick={() => handleViewChange('joinRoomByPin')} className="btn-blue">Rejoindre une room privée</button>
                <button onClick={() => handleViewChange('createRoom')} className="btn-green">Créer une room</button>
                <button onClick={() => handleViewChange('getRooms')} className="btn-gray">Voir les rooms</button>
              </div>

              {currentView === 'joinRoomByPin' && (
                <EnterPinForm joinRoomByPin={handleJoinRoomByPin} />
              )}

              {currentView === 'createRoom' && (
                <CreateRoomForm createRoom={handleCreateRoom} />
              )}

              {currentView === 'getRooms' && (
                <RoomList joinRoom={handleJoinRoom} />
              )}
            </>
          ) : (
            <UserList startGame={handleStartGame} endRoom={handleEndGame} />
          )}
        </>
      )}
    </div>
  );
};

export default QuizApp;
