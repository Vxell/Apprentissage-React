import { useState } from "react";

interface FormState {
    nom:string;
    email:string;
    sujet:"general"|"support"|"vente";
    message:string;
}

interface Erreurs {
  nom?: string;
  email?: string;
  message?: string;
}

export default function FormulaireContact() {
    const [form, setForm] = useState<FormState>({
        nom: "",
        email: "",
        sujet: "general",
        message: ""
    });

    const erreurs = valider(form);
    const formulaireValide = Object.keys(erreurs).length === 0;
    const [success, setSuccess] = useState<boolean>(false);
    
    function valider(form: FormState): Erreurs {
        const erreurs: Erreurs = {};

        if (!form.nom.trim()) {
            erreurs.nom = "Le nom est requis";
        }

        if(form.nom.length < 2){
            erreurs.nom = "Le nom doit contenir au moins 2 caractères";
        }

        if (!form.email.trim()) {
            erreurs.email = "L'email est requis";
        } else if (!/\S+@\S+\.\S+/.test(form.email)) {
            erreurs.email = "L'email n'est pas valide";
        }

        if (!form.message.trim()) {
            erreurs.message = "Le message est requis";
        }

        if(form.message.length < 10){
            erreurs.message = "Le message doit contenir au moins 10 caractères";
        }

        return erreurs;
    }

    function updateField<K extends keyof FormState>(cle: K, valeur: FormState[K]) {
        setForm((prev) => ({ ...prev, [cle]: valeur }));
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!formulaireValide) return;

        // Simulation de l'envoi des données
        console.log("Données envoyées avec succès :", form);
        setSuccess(true);
        setForm({
            nom:"",
            email:"",
            sujet:"general",
            message:""
        });
    };

    return (
    <div style={{ maxWidth: "400px", margin: "20px auto", fontFamily: "sans-serif" }}>
      <h2>Contactez-nous</h2>

      {success && (
        <div style={{ padding: "10px", marginBottom: "15px", backgroundColor: "#e6f4ea", color: "#137333", borderRadius: "4px" }}>
          Votre message a été envoyé avec succès !
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
        
        {/* Champ Nom */}
        <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
          <label htmlFor="nom">Nom :</label>
          <input
            id="nom"
            type="text"
            value={form.nom}
            onChange={(e) => updateField("nom", e.target.value)}
          />
          {erreurs.nom && <span style={{ color: "red", fontSize: "14px" }}>{erreurs.nom}</span>}
        </div>

        {/* Champ Email */}
        <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
          <label htmlFor="email">Email :</label>
          <input
            id="email"
            type="email"
            value={form.email}
            onChange={(e) => updateField("email", e.target.value)}
          />
          {erreurs.email && <span style={{ color: "red", fontSize: "14px" }}>{erreurs.email}</span>}
        </div>

        {/* Champ Sujet */}
        <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
          <label htmlFor="sujet">Sujet :</label>
          <select
            id="sujet"
            value={form.sujet}
            onChange={(e) => updateField("sujet", e.target.value as FormState["sujet"])}
          >
            <option value="general">Question générale</option>
            <option value="support">Support technique</option>
            <option value="vente">Vente</option>
          </select>
        </div>

        {/* Champ Message */}
        <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
          <label htmlFor="message">Message :</label>
          <textarea
            id="message"
            value={form.message}
            onChange={(e) => updateField("message", e.target.value)}
            rows={5}
          />
          {/* Bonus : Compteur de caractères */}
          <p style={{ fontSize: "12px", margin: "0", color: form.message.length < 10 ? "red" : "#888" }}>
            {form.message.length} caractères (min 10)
          </p>
          {erreurs.message && <span style={{ color: "red", fontSize: "14px" }}>{erreurs.message}</span>}
        </div>

        {/* Bouton de soumission */}
        <button 
          disabled={!formulaireValide} 
          type="submit"
          style={{
            padding: "10px",
            backgroundColor: formulaireValide ? "#007bff" : "#ccc",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: formulaireValide ? "pointer" : "not-allowed"
          }}
        >
          Envoyer
        </button>

      </form>
    </div>
  );
}