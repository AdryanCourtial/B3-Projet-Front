import React, { useState } from 'react';

interface EnterPinFormProps {
  joinRoomByPin: (enteredPin: string, pseudo: string) => void;
  pseudo: string; // Ajouter la prop pour le pseudo
  setPseudo: React.Dispatch<React.SetStateAction<string>>; // Fonction pour modifier le pseudo
}

const EnterPinForm: React.FC<EnterPinFormProps> = ({ joinRoomByPin, pseudo, setPseudo }) => {
  const [enteredPin, setEnteredPin] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (enteredPin.trim() && pseudo.trim()) {
      joinRoomByPin(enteredPin, pseudo);  // Passer le PIN et le pseudo à la fonction joinRoomByPin
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
          onChange={(e) => setPseudo(e.target.value)} // Met à jour le pseudo
        />
        <input
          type="text"
          placeholder="Entrez le PIN"
          value={enteredPin}
          required
          maxLength={4}
          onChange={(e) => setEnteredPin(e.target.value)} // Met à jour le PIN
        />
        <button type="submit">Rejoindre</button>
      </form>
    </div>
  );
};

export default EnterPinForm;
