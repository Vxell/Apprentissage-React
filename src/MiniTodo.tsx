import { useState } from "react";

interface Tache {
  id: string;
  titre: string;
  terminee: boolean;
}

export default function MiniTodo() {
    const [taches, setTaches] = useState<Tache[]>([]);
    const [nouveauTitre, setNouveauTitre] = useState("");

    const ajouter = () => {
        if (!nouveauTitre.trim()) return;

            const nouvelleTache: Tache = {
                id: Date.now().toString(),
                titre: nouveauTitre,
                terminee: false,
            };

            setTaches([...taches, nouvelleTache]);
            setNouveauTitre("");
    };

    const basculer= (id:string) =>{

        setTaches(taches.map(t =>
            t.id === id ? { ...t, terminee: !t.terminee } : t
        ));

    }

    const supprimer = (id:string) => {
        setTaches(taches.filter(t => t.id !== id));

    }

    const tachesRestantes = taches.filter((tache) => !tache.terminee).length;

    return (
    <div style={{ padding: "20px", maxWidth: "500px", margin: "0 auto" }}>
  <h2>Mini Todo List 📝</h2>

  <div style={{ display: "flex", gap: "8px", marginBottom: "16px" }}>
    <input
      type="text"
      value={nouveauTitre}
      onChange={(e) => setNouveauTitre(e.target.value)}
      placeholder="Ajouter une tâche..."
      style={{ flex: 1, padding: "8px" }}
    />
    <button onClick={ajouter} disabled={!nouveauTitre.trim()}>
      Ajouter
    </button>
  </div>

  {taches.length === 0 ? (
    <p style={{ color: "#888", textAlign: "center" }}>
      Aucune tâche pour l'instant 📝
    </p>
  ) : (
    <ul style={{ listStyle: "none", padding: 0 }}>
      {taches.map((tache) => (
        <li
          key={tache.id}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "8px",
            borderBottom: "1px solid #eee",
          }}
        >
          <label style={{ display: "flex", alignItems: "center", flex: 1 }}>
            <input
              type="checkbox"
              checked={tache.terminee}
              onChange={() => basculer(tache.id)}
            />
            <span
              style={{
                textDecoration: tache.terminee ? "line-through" : "none",
                color: tache.terminee ? "#888" : "#fff",
                marginLeft: "8px",
              }}
            >
              {tache.titre}
            </span>
          </label>
          <button onClick={() => supprimer(tache.id)}>Supprimer</button>
        </li>
      ))}
    </ul>
  )}

  <div style={{ marginTop: "16px", color: "#555" }}>
    <strong>{tachesRestantes}</strong>{" "}
    {tachesRestantes <= 1 ? "tâche restante" : "tâches restantes"}
  </div>
</div>
  );
}

