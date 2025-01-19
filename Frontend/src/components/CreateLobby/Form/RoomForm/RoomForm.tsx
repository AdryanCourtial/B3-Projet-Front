import { useAtom } from 'jotai';
import React from 'react';
import { isPrivateAtom, roomIdAtom, userPseudo } from '../../../../atoms/UserAtoms';
import "./RoomForm.css"

interface RoomFormProps {

  createRoom: () => void;
}

const RoomForm: React.FC<RoomFormProps> = ({ createRoom }) => {

  const [pseudo, setPseudo] = useAtom(userPseudo)

  const [roomId, setRoomId] = useAtom(roomIdAtom)

  const [isPrivate, setIsPrivate] = useAtom(isPrivateAtom)


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); 
    if (pseudo.trim() && roomId.trim()) {
      createRoom();  
    } else {
      alert("Veuillez remplir tous les champs.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className='formulaire_create'>
      <div>
        <input
          type="text"
          placeholder="Pseudo"
          value={pseudo}
          required
          onChange={(e) => setPseudo(e.target.value)}
        />
      </div>
      <div>
        <input
          type="text"
          placeholder="Nom de la room"
          value={roomId}
          required
          onChange={(e) => setRoomId(e.target.value)}
        />
      </div>
      <div className='flex justify-center gap-4 items-center h-[100px] bg-[#f5f5f5]'>
        <label>
          Room privée
        </label>
        <input
          type="checkbox"
          checked={isPrivate}
          onChange={() => setIsPrivate(!isPrivate)}
        />
      </div>
      <div>
        <button type="submit">Créer une room</button>
      </div>
    </form>
  );
};

export default RoomForm;
