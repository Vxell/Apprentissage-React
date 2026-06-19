import { useState } from "react";

interface Tache {
  id: string;
  titre: string;
  terminee: boolean;
}
type Filtre = "tous" | "actives" | "terminees";


export default function TodoAvancee() {
    const [taches, setTaches] = useState<Tache[]>([]);
    const [nouveauTitre, setNouveauTitre] = useState("");
    const [filtre, setFiltre] = useState<Filtre>("tous");
    const [recherche, setRecherche] = useState("");        // ← déplacé ici
    const [aSupprimer, setASupprimer] = useState<string | null>(null);

    const tachesAffichees = taches
        .filter((t) => {
            if (filtre === "actives") return !t.terminee;
            if (filtre === "terminees") return t.terminee;
            return true;
        })
        .filter((t) =>
            t.titre.toLowerCase().includes(recherche.toLowerCase())
        );
        
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
        <input
        type="text"
        value={recherche}
        onChange={(e) => setRecherche(e.target.value)}
        placeholder="🔍 Rechercher..."
        style={{ width: "100%", padding: "8px", marginBottom: "12px", boxSizing: "border-box" }}
        />
        <div style={{ display: "flex", gap: "8px", marginBottom: "12px" }}>
            <button
                onClick={() => setFiltre("tous")}
                style={{ fontWeight: filtre === "tous" ? "bold" : "normal" }}
            >
                Tous
            </button>
            <button
                onClick={() => setFiltre("actives")}
                style={{ fontWeight: filtre === "actives" ? "bold" : "normal" }}
            >
                Actives
            </button>
            <button
                onClick={() => setFiltre("terminees")}
                style={{ fontWeight: filtre === "terminees" ? "bold" : "normal" }}
            >
                Terminées
            </button>
        </div>
    <h2>Todo List Avancée 📝</h2>

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
        {tachesAffichees.map((tache) => (
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
            <button onClick={() => setASupprimer(tache.id)}>Supprimer</button>
            </li>
        ))}
        </ul>
    )}

    <div style={{ marginTop: "16px", color: "#555" }}>
        <strong>{tachesRestantes}</strong>{" "}
        {tachesRestantes <= 1 ? "tâche restante" : "tâches restantes"}
    </div>
    {aSupprimer && (
    <div style={{
        position: "fixed",
        top: 0, left: 0, right: 0, bottom: 0,
        background: "rgba(0,0,0,0.5)",
        display: "flex", alignItems: "center", justifyContent: "center",
        zIndex: 100,
    }}>
        <div style={{
        background: "white",
        padding: "24px",
        borderRadius: "8px",
        color: "#000",
        maxWidth: "400px",
        }}>
        <h3 style={{ marginTop: 0 }}>Supprimer cette tâche ?</h3>
        <p>Cette action est irréversible.</p>
        <div style={{ display: "flex", gap: "8px", justifyContent: "flex-end" }}>
            <button onClick={() => setASupprimer(null)}>Annuler</button>
            <button
            onClick={() => {
                supprimer(aSupprimer);
                setASupprimer(null);
            }}
            style={{ background: "#e74c3c", color: "white" }}
            >
            Supprimer
            </button>
        </div>
        </div>
    </div>
    )}
    </div>
  );
}

