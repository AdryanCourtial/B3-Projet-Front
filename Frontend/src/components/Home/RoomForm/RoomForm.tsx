import React from 'react';

interface RoomFormProps {
  pseudo: string;
  setPseudo: React.Dispatch<React.SetStateAction<string>>;
  roomId: string;
  setRoomId: React.Dispatch<React.SetStateAction<string>>;
  isPrivate: boolean;
  setIsPrivate: React.Dispatch<React.SetStateAction<boolean>>;
  createRoom: () => void;
}

const RoomForm: React.FC<RoomFormProps> = ({ pseudo, setPseudo, roomId, setRoomId, isPrivate, setIsPrivate, createRoom }) => {
  return (
    <div>
      <input
        type="text"
        placeholder="Pseudo"
        value={pseudo}
        onChange={(e) => setPseudo(e.target.value)}
      />
      <input
        type="text"
        placeholder="Room ID"
        value={roomId}
        onChange={(e) => setRoomId(e.target.value)}
      />
      <label>
        Room privée
        <input
          type="checkbox"
          checked={isPrivate}
          onChange={() => setIsPrivate(!isPrivate)}
        />
      </label>

      <button onClick={createRoom}>Créer une room</button>
    </div>
  );
};

export default RoomForm;
