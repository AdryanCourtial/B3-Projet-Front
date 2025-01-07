// EnterPinForm.tsx
import React, { useState } from 'react';

interface EnterPinFormProps {
  joinRoomByPin: (enteredPin: string) => void;
}

const EnterPinForm: React.FC<EnterPinFormProps> = ({ joinRoomByPin }) => {
  const [enteredPin, setEnteredPin] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (enteredPin.trim()) {
      joinRoomByPin(enteredPin);  // Appelle la fonction joinRoomByPin avec le PIN saisi
    } else {
      alert("Veuillez entrer un PIN valide.");
    }
  };

  return (
    <div>
      <h3>Entrez le PIN de la room privée</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Entrez le PIN"
          value={enteredPin}
          onChange={(e) => setEnteredPin(e.target.value)}
        />
        <button type="submit">Rejoindre</button>
      </form>
    </div>
  );
};

export default EnterPinForm;
