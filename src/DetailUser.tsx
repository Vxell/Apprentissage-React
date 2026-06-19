import { useState, useEffect } from "react";

interface UserDetail{
    id: number;
    name:string;
    email:string;
    username:string;
    address: {city:string,street:string};
}

export default function DetailUser(){

    const [userId, setUserId] = useState<number>(1);
    const [user, setUser] = useState<UserDetail | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
    async function charger() {
      setLoading(true);
      try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
        if (!response.ok) throw new Error("Erreur");
        const data: UserDetail = await response.json();
        setUser(data);
      } finally {
        setLoading(false);
      }
    }
    charger();
    }, [userId]); 

    return (
    <div style={{ padding: "20px" }}>
      <h2>Détail utilisateur</h2>

      <div style={{ marginBottom: "16px" }}>
        <label>ID utilisateur (1-10) : </label>
        <input
          type="number"
          min={1}
          max={10}
          value={userId}
          onChange={(e) => setUserId(Number(e.target.value))}
        />
      </div>

      {loading && <p>⏳ Chargement...</p>}

      {user && !loading && (
        <div style={{ border: "1px solid #ddd", padding: "16px", borderRadius: "6px" }}>
          <h3>{user.name}</h3>
          <p>@{user.username}</p>
          <p>📧 {user.email}</p>
          <p>🏠 {user.address.street}, {user.address.city}</p>
        </div>
      )}
    </div>
  );
}