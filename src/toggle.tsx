import { useState } from 'react';

function Toggle() {
  const [visible, setVisible] = useState(true);

  return (
    <div style={{ padding: "20px", border: "1px solid #ddd", borderRadius: "8px", marginBottom: "16px" }}>
      <h3>Toggle</h3>
      <button onClick={() => setVisible((prev) => !prev)}>
        {visible ? "Cacher" : "Afficher"} le message
      </button>
      {visible && (
        <p style={{ marginTop: "12px", color: "#2ecc71" }}>
          ✨ Je suis visible !
        </p>
      )}
    </div>
  );
}

export default Toggle;