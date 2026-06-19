// interface SalutationProps {
//   name: string;
//   age: number;
//   ville?: string;
// }

// import { useState } from "react";
// import DetailUser from "./DetailUser";
// import FormulaireContact from "./FormulaireContact";
import RechercheUsers from "./RechercheUsers";
// import ListeUsers from "./ListeUsers";

// interface BoutonProps {
//   texte:string;
//   couleur?:"rouge"|"bleu"|"vert";
// }

// function Bouton({texte,couleur}:BoutonProps) {
//   const styles = {
//     rouge: { backgroundColor: "#e74c3c", color: "white" },
//     bleu: { backgroundColor: "#3498db", color: "white" },
//     vert: { backgroundColor: "#2ecc71", color: "white" }
//   };

//   return (
//     <button style={{...styles[couleur ?? "bleu"],padding: "10px 20px", border: "none", borderRadius: "5px",cursor: "pointer",marginRight: "10px"}}>{texte}</button>
//   )
// }

// interface CarteProps {
//   titre: string;
//   children: React.ReactNode;
// }

// function Carte({ titre, children }: CarteProps) {
//   return (
//     <div style={{
//       border: "1px solid #ddd",
//       borderRadius: "8px",
//       padding: "16px",
//       marginBottom: "16px",
//       backgroundColor: "#f9f9f9",
//     }}>
//       <h3 style={{ marginTop: 0 }}>{titre}</h3>
//       {children}
//     </div>
//   );
// }

// function Salutation({name,age,ville}:SalutationProps) {
//   return (
//     <div>
//       <h2>Bonjour, {name} !</h2>
//       <p>Vous avez {age} ans.</p>
//       {ville && <p>Vous vivez à {ville}.</p>}
//     </div>
//   );
// }

// interface Developpeur {
//      nom: string;
//      poste: string;
//      experienceAnnees: number;
//      competences: string[];
//      disponible: boolean;
// }

// interface CarteDevProps {
//   dev: Developpeur;
// }


// function CarteDev({dev}: CarteDevProps) {
//   return (
//     <div>
//       <p>{dev.poste}</p>
//       <p>Expérience: {dev.experienceAnnees} ans</p>
//       <p>Compétences: {dev.competences.join(", ")}</p>
//       <p>Disponible: {dev.disponible ? "✅ Disponible" : "❌ Indisponible"}</p>
//     </div>
//   )
// }

// function ChampTexte() {
//   const [valeur, setValeur] = useState("");

//   return (
//     <div>
//       <input
//         type="text"
//         value={valeur}
//         onChange={(e) => setValeur(e.target.value)}
//       />
//       <p>Tu as tapé : {valeur}</p>
//     </div>
//   );
// }

// function Formulaire() {
//   const [nom, setNom] = useState("");

//   function handleSubmit(e: React.FormEvent) {
//     e.preventDefault();  // empêche le rechargement de la page
//     console.log("Submit avec :", nom);
//     setNom("");  // vide le champ après soumission
//   }

//   return (
//     <form onSubmit={handleSubmit}>
//       <input value={nom} onChange={(e) => setNom(e.target.value)} />
//       <button type="submit">Envoyer</button>
//     </form>
//   );
// }

function App(){
  // const developpeurs: Developpeur[] = [
  //   {
  //     nom: "Axel Kouame",
  //     poste: "Développeur Frontend",
  //     experienceAnnees: 3,
  //     competences: ["React", "TypeScript", "CSS"],
  //     disponible: true
  //   },
  //   {
  //     nom: "Marie Dupont",
  //     poste: "Développeur Backend",
  //     experienceAnnees: 5,
  //     competences: ["Node.js", "Express", "MongoDB"],
  //     disponible: false
  //   },
  //   {
  //     nom: "Jean Martin",
  //     poste: "Développeur Full Stack",
  //     experienceAnnees: 4,
  //     competences: ["React", "Node.js", "SQL"],
  //     disponible: true
  //   }
  // ]
  return(
  //   <div>
  //     {developpeurs.map((dev) => (
  //    <CarteDev dev={dev} key={dev.nom} />
  //  ))}
  //   </div>
    <div style={{ padding: "20px" }}>
      {/* <h1>Notre équipe</h1>
      {developpeurs.map((dev) => (
        <Carte titre={dev.nom} key={dev.nom}>
          <CarteDev dev={dev} />
        </Carte>
      ))}
      <h2>Test du champ texte</h2>
      <Formulaire />
      <Compteur /> */}
      <h1>Bienvenue dans mon app React !</h1>
      {/* <FormulaireContact/> */}
      {/* <ListeUsers/> */}
      {/* <DetailUser/> */}
      <RechercheUsers />
    </div>

  )
}

export default App;