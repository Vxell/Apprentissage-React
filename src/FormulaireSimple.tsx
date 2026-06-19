import { useState } from 'react';

function FormulaireSimple() {
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [messages, setMessages] = useState<string[]>([]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!nom || !email) return;  // validation simple

    const nouveauMessage = `${nom} (${email})`;
    setMessages((prev) => [...prev, nouveauMessage]);
    setNom("");
    setEmail("");
  }

  return (
    <div style={{ padding: "20px", border: "1px solid #ddd", borderRadius: "8px", marginBottom: "16px" }}>
      <h3>Formulaire</h3>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "8px" }}>
          <input
            type="text"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            placeholder="Nom"
            style={{ padding: "8px", width: "100%", boxSizing: "border-box" }}
          />
        </div>
        <div style={{ marginBottom: "8px" }}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            style={{ padding: "8px", width: "100%", boxSizing: "border-box" }}
          />
        </div>
        <button type="submit">Ajouter</button>
      </form>

      <h4 style={{ marginTop: "16px" }}>Liste :</h4>
      <ul>
        {messages.map((msg, index) => (
          <li key={index}>{msg}</li>
        ))}
      </ul>
    </div>
  );
}

export default FormulaireSimple;