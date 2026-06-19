import { useState , useEffect } from "react";

interface User{
    id: number;
    name: string;
    email: string;
    phone: string;
    website: string;
}

type EtatApi <T>= 
    | { status: "loading" }
    | { status: "success"; data: T }
    | { status: "error"; error: string };

    export default function ListeUsers() {
        const [etat, setEtat] = useState<EtatApi<User[]>>({ status: "loading" });

        useEffect(()=>{
            async function charger(){
                try {
                    const response = await fetch("https://jsonplaceholder.typicode.com/users");
                    if(!response.ok) throw new Error("HTTP error " + response.status);
                    const data : User[] = await response.json();
                    setEtat({ status: "success", data });
                } catch (error) {
                    const message = error instanceof Error ? error.message : "Erreur inconnue";
                    setEtat({ status: "error", error: message });
                }
            }
            charger();
        }, []);
        if (etat.status === "loading") {
            return <p style={{ padding: "20px" }}>⏳ Chargement...</p>;
        }

        if (etat.status === "error") {
            return <p style={{ padding: "20px", color: "red" }}>❌ {etat.error}</p>;
        }

        return(
            <div style={{ padding: "20px" }}>
            <h2>Liste des utilisateurs ({etat.data.length})</h2>
            <ul style={{ listStyle: "none", padding: 0 }}>
                {etat.data.map((u) => (
                <li
                    key={u.id}
                    style={{
                    padding: "12px",
                    marginBottom: "8px",
                    border: "1px solid #ddd",
                    borderRadius: "6px",
                    }}
                >
                    <h3 style={{ margin: "0 0 4px 0" }}>{u.name}</h3>
                    <p style={{ margin: "0", color: "#888" }}>📧 {u.email}</p>
                    <p style={{ margin: "0", color: "#888" }}>📞 {u.phone}</p>
                    <p style={{ margin: "0", color: "#888" }}>🌐 {u.website}</p>
                </li>
                ))}
            </ul>
            </div>
        );
    }