/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";

interface UserResume {
  id: number;
  name: string;
  email: string;
  address: { city: string };
}

type Etat =
  | { statut: "loading" }
  | { statut: "error"; message: string }
  | { statut: "success"; users: UserResume[] };

export default function RechercheUsers() {
  const [etat, setEtat] = useState<Etat>({ statut: "loading" });
  const [recherche, setRecherche] = useState("");
  const [ville, setVille] = useState<string>("toutes");

  // Fonction séparée pour pouvoir la réutiliser (bonus: bouton Réessayer)
  async function charger() {
    setEtat({ statut: "loading" });

    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users"
      );

      if (!response.ok) {
        throw new Error("Erreur lors du chargement");
      }

      const data: UserResume[] = await response.json();

      setEtat({
        statut: "success",
        users: data,
      });
    } catch (error) {
      setEtat({
        statut: "error",
        message:
          error instanceof Error
            ? error.message
            : "Erreur inconnue",
      });
    }
  }

  useEffect(() => {
    charger();
  }, []);

  // Liste des villes uniques
  const villes =
    etat.statut === "success"
      ? Array.from(new Set(etat.users.map((u) => u.address.city)))
      : [];

  // Utilisateurs filtrés
  const usersFiltres =
    etat.statut === "success"
      ? etat.users
          .filter((u) =>
            u.name.toLowerCase().includes(recherche.toLowerCase())
          )
          .filter(
            (u) => ville === "toutes" || u.address.city === ville
          )
      : [];

  // Etat loading
  if (etat.statut === "loading") {
    return (
      <div style={{ padding: 20, fontSize: 18 }}>
        ⏳ Chargement des utilisateurs...
      </div>
    );
  }

  // Etat erreur
  if (etat.statut === "error") {
    return (
      <div style={{ padding: 20 }}>
        <p style={{ color: "red" }}>❌ {etat.message}</p>
        <button onClick={charger}>Réessayer</button>
      </div>
    );
  }

  // Etat success
  return (
    <div style={{ padding: 20 }}>
      <h2>Recherche utilisateurs</h2>

      {/* Champ recherche */}
      <input
        type="text"
        placeholder="🔍 Rechercher par nom..."
        value={recherche}
        onChange={(e) => setRecherche(e.target.value)}
        style={{
          padding: 10,
          width: "300px",
          marginBottom: 15,
          display: "block",
        }}
      />

      {/* Select ville */}
      <select
        value={ville}
        onChange={(e) => setVille(e.target.value)}
        style={{ padding: 10, marginBottom: 20 }}
      >
        <option value="toutes">Toutes</option>

        {villes.map((v) => (
          <option key={v} value={v}>
            {v}
          </option>
        ))}
      </select>

      <p>📋 {usersFiltres.length} résultat(s)</p>

      {/* Liste */}
      {usersFiltres.length === 0 ? (
        <p>Aucun utilisateur trouvé</p>
      ) : (
        usersFiltres.map((user) => (
          <div
            key={user.id}
            style={{
              border: "1px solid #ccc",
              padding: 15,
              marginBottom: 15,
              borderRadius: 8,
              width: 300,
            }}
          >
            <h3>{user.name}</h3>
            <p>📧 {user.email}</p>
            <p>🏠 {user.address.city}</p>
          </div>
        ))
      )}
    </div>
  );
}