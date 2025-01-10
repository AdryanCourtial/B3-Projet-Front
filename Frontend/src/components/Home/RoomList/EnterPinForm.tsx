import React, { useState } from 'react';
import { messageServer, userPseudo } from '../../../atoms/UserAtoms';
import { useAtom } from 'jotai';

interface EnterPinFormProps {
  joinRoomByPin: (enteredPin: string, pseudo: string) => void;
}

const EnterPinForm: React.FC<EnterPinFormProps> = ({ joinRoomByPin }) => {
  const [enteredPin, setEnteredPin] = useState<string>('');
  const [message] = useAtom(messageServer);
  const [pseudo, setPseudo] = useAtom(userPseudo)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (enteredPin.trim() && pseudo.trim()) {
      joinRoomByPin(enteredPin, pseudo); 
    } else {
      alert("Veuillez entrer un PIN et un pseudo valides.");
    }
  };

  return (
    <div>
      <h3>Entrez votre pseudo et le PIN de la room privée</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Entrez votre pseudo"
          value={pseudo}
          required
          onChange={(e) => setPseudo(e.target.value)} 
        />
        <input
          type="text"
          placeholder="Entrez le PIN"
          value={enteredPin}
          required
          maxLength={4}
          onChange={(e) => setEnteredPin(e.target.value)} 
        />
        <button type="submit">Rejoindre</button>

      </form>
      {message && <p style={{ color: 'red' }}>{message}</p>}
      
    </div>
  );
};

export default EnterPinForm;
