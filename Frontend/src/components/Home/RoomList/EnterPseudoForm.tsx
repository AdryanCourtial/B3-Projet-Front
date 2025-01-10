// EnterPseudoForm.tsx
import { useAtom } from 'jotai';
import React from 'react';
import { userPseudo } from '../../../atoms/UserAtoms';

interface EnterPseudoFormProps {
  onSubmit: () => void;
}

const EnterPseudoForm: React.FC<EnterPseudoFormProps> = ({ onSubmit }) => {

  const [pseudo, setPseudo] = useAtom(userPseudo)

  return (
    <div>
      <h3>Entrez votre pseudo</h3>
      <input 
        type="text" 
        placeholder="Votre pseudo"
        value={pseudo}
        required
        onChange={(e) => setPseudo(e.target.value)} 
      />
      <button onClick={onSubmit} disabled={!pseudo.trim()}>Rejoindre</button>
    </div>
  );
};

export default EnterPseudoForm;
