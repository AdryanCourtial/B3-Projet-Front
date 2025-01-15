import React, { useState } from 'react';
import { useAtom } from 'jotai';
import { messageServer, userPseudo } from '../../atoms/UserAtoms';
import useLobby from '../../hooks/useLobby';



const Private: React.FC = () => {

  const {handleJoinRoomByPin} = useLobby()


  const [enteredPin, setEnteredPin] = useState<string>('');
  const [message] = useAtom(messageServer);
  const [pseudo, setPseudo] = useAtom(userPseudo);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (enteredPin.trim() && pseudo.trim()) {
      handleJoinRoomByPin(enteredPin, pseudo);
    } else {
      alert("Veuillez entrer un PIN et un pseudo valides.");
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h3 className="text-2xl font-bold mb-6 text-center text-gray-800">Rejoindre une room privée</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="text"
            placeholder="Entrez votre pseudo"
            value={pseudo}
            required
            onChange={(e) => setPseudo(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <input
            type="text"
            placeholder="Entrez le PIN"
            value={enteredPin}
            required
            maxLength={4}
            onChange={(e) => setEnteredPin(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Rejoindre
        </button>
      </form>

      {message && (
        <p className="mt-4 text-red-500 text-center">{message}</p>
      )}
    </div>
  );
};

export default Private;
