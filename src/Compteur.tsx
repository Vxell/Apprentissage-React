import { useState } from 'react';

function Compteur() {
  const [count, setCount] = useState(0);

  return (
    <div style={{ padding: "20px", border: "1px solid #ddd", borderRadius: "8px", marginBottom: "16px" }}>
      <h3>Compteur</h3>
      <p style={{ fontSize: "32px", margin: "8px 0" }}>{count}</p>
      <button onClick={() => setCount((prev) => prev + 1)}>+1</button>
      <button onClick={() => setCount((prev) => prev - 1)} style={{ marginLeft: "8px" }}>-1</button>
      <button onClick={() => setCount(0)} style={{ marginLeft: "8px" }}>Reset</button>
    </div>
  );
}

export default Compteur;