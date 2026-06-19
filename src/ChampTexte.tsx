import { useState } from 'react';

function ChampTexte() {
  const [texte, setTexte] = useState("");

  return (
    <div style={{ padding: "20px", border: "1px solid #ddd", borderRadius: "8px", marginBottom: "16px" }}>
      <h3>Champ texte</h3>
      <input
        type="text"
        value={texte}
        onChange={(e) => setTexte(e.target.value)}
        placeholder="Tape quelque chose..."
        style={{ padding: "8px", width: "100%", boxSizing: "border-box" }}
      />
      <p>Tu as tapé : <strong>{texte}</strong></p>
      <p>Longueur : {texte.length} caractères</p>
      <p>En majuscules : {texte.toUpperCase()}</p>
      <button onClick={() => setTexte("")}>Effacer</button>
    </div>
  );
}

export default ChampTexte;