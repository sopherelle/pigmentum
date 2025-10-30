export const searchMuseums = async (query) => {
  const res = await fetch("http://localhost:3001/api/search", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });
  const data = await res.json();
  console.log(data);
  return data;
};

// Convertir RGB en format de recherche
// const rgbToSearchColor = (rgb) => {
//   // Simplifier les couleurs en catégories pour la recherche
//   const [r, g, b] = rgb;

//   // Identifier la couleur dominante
//   if (r > 180 && g > 180 && b > 180) return "white";
//   if (r < 80 && g < 80 && b < 80) return "black";
//   if (r > g + 30 && r > b + 30) return "red";
//   if (g > r + 30 && g > b + 30) return "green";
//   if (b > r + 30 && b > g + 30) return "blue";
//   if (r > 150 && g > 150 && b < 100) return "yellow";
//   if (r > 150 && b > 150 && g < 100) return "purple";
//   if (r > 150 && g > 100 && b < 100) return "orange";

//   return "brown";
// };

// Rechercher des œuvres au Metropolitan Museum
// export const searchMetMuseum = async (colors) => {
//   try {
//     // Prendre les 3 couleurs dominantes
//     const dominantColors = colors.slice(0, 3);
//     const colorNames = dominantColors.map(rgbToSearchColor);

//     // Rechercher des œuvres avec ces couleurs
//     // Le Met a une API de recherche par département
//     const departments = [11, 21]; // Peintures européennes et américaines

//     const artworks = [];

//     for (const dept of departments) {
//       const searchUrl = `https://collectionapi.metmuseum.org/public/collection/v1/search?departmentId=${dept}&hasImages=true&q=painting`;

//       const searchResponse = await fetch(searchUrl);
//       const searchData = await searchResponse.json();

//       if (searchData.objectIDs && searchData.objectIDs.length > 0) {
//         // Prendre 5 œuvres aléatoires
//         const randomIds = searchData.objectIDs
//           .sort(() => 0.5 - Math.random())
//           .slice(0, 5);

//         for (const id of randomIds) {
//           const objectUrl = `https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`;
//           const objectResponse = await fetch(objectUrl);
//           const objectData = await objectResponse.json();

//           if (objectData.primaryImage) {
//             artworks.push({
//               id: objectData.objectID,
//               title: objectData.title || "Sans titre",
//               artist: objectData.artistDisplayName || "Artiste inconnu",
//               date: objectData.objectDate || "Date inconnue",
//               culture: objectData.culture || objectData.dynasty || "",
//               image: objectData.primaryImage,
//               museum: "Metropolitan Museum of Art",
//               link: objectData.objectURL,
//             });
//           }

//           if (artworks.length >= 6) break;
//         }
//       }

//       if (artworks.length >= 6) break;
//     }

//     return artworks.slice(0, 6);
//   } catch (error) {
//     console.error("Erreur lors de la recherche au Met:", error);
//     return [];
//   }
// };
