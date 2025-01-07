// EnterPseudoForm.tsx
import React from 'react';

interface EnterPseudoFormProps {
  pseudo: string;
  setPseudo: React.Dispatch<React.SetStateAction<string>>;
  onSubmit: () => void;
}

const EnterPseudoForm: React.FC<EnterPseudoFormProps> = ({ pseudo, setPseudo, onSubmit }) => {
  return (
    <div>
      <h3>Entrez votre pseudo</h3>
      <input 
        type="text" 
        placeholder="Votre pseudo"
        value={pseudo} 
        onChange={(e) => setPseudo(e.target.value)} 
      />
      <button onClick={onSubmit} disabled={!pseudo.trim()}>Rejoindre</button>
    </div>
  );
};

export default EnterPseudoForm;
