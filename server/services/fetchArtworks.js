const MET_API = "https://collectionapi.metmuseum.org/public/collection/v1";
const RIJKS_API = "https://www.rijksmuseum.nl/api/en/collection";
const CHICAGO_API = "https://api.artic.edu/api/v1/artworks";
const PARISMUSEES_API = " https://apicollections.parismusees.paris.fr/graphql";

async function fetchMetArtworks(limit = 50) {
  const search = await fetch(`${MET_API}/search?hasImages=true&q=painting`);
  const data = await search.json();
  const ids = data.objectIDs?.slice(0, limit) || [];
  const results = [];
  for (const id of ids) {
    try {
      const objRes = await fetch(`${MET_API}/objects/${id}`);
      const obj = await objRes.json();
      if (obj.primaryImageSmall) {
        results.push({
          id: obj.objectID,
          title: obj.title,
          artist: obj.artistDisplayName,
          image: obj.primaryImageSmall,
          source: "MET",
        });
      }
    } catch (err) {
      console.log(err);
    }
  }
  return results;
}

async function fetchRijksArtworks(limit = 100) {
  const RIJKS_KEY = process.env.RIJKS_APIKEY;
  try {
    const res = await fetch(
      `${RIJKS_API}?key=${RIJKS_KEY}&imgonly=true&type=painting&ps=${limit}`
    );
    if (res) {
      const data = await res.json();
      return data.artObjects.map((obj) => ({
        id: obj.objectNumber,
        title: obj.title,
        artist: obj.principalOrFirstMaker,
        image: obj.webImage?.url,
        source: "Rijksmuseum",
      }));
    }
  } catch (err) {
    console.log(err);
  }
}

async function fetchChicagoInstituteArtworks(limit = 100) {
  const res = await fetch(
    `${CHICAGO_API}?limit=${limit}&fields=id,title,artist_title,image_id`
  );
  const { data } = await res.json();
  return data
    .filter((obj) => obj.image_id)
    .map((obj) => ({
      id: obj.id,
      title: obj.title,
      artist: obj.artist_title,
      image: `https://www.artic.edu/iiif/2/${obj.image_id}/full/400,/0/default.jpg`,
      source: "Art Institute of Chicago",
    }))
    .filter((o) => o.image);
}

// async function fetchParisMuseesArtworks(limit = 50) {
// const parisMuseesKey = process.env.PARISMUSEES_APIKEY;
//   const query = `
//       query {
//         nodeQuery(filter: {conditions: [
//           {field: "type", value: "oeuvre"},
//           {field: "field_oeuvre_types_objet.entity.field_lref_adlib", value: "4493"}
//         ]}, limit: 20) {
//           count
//           entities {
//             entityUuid
//             ... on NodeOeuvre {
//               title
//               fieldLrefAdlib
//             }
//           }
//         }
//       }
//     `;
//   const res = await fetch(
//     "https://apicollections.parismusees.paris.fr/graphql",
//     {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         "auth-token": `${PARISMUSEES_APIKEY}`,
//       },
//       body: JSON.stringify({ query }),
//     }
//   );
//   console.log(res);
//   const { data } = await res.json();
//   return data
//     .filter((obj) => obj.image_id)
//     .map((obj) => ({
//       id: obj.id,
//       title: obj.title,
//       artist: obj.artist_title,
//       // image: `https://www.artic.edu/iiif/2/${obj.image_id}/full/843,/0/default.jpg`,
//       source: "Art Institute of Chicago",
//     }))
//     .filter((o) => o.image);
// }

export async function fetchAllArtworks() {
  const [metResults, gettyResults, chicagoResults] = await Promise.all([
    fetchMetArtworks(),
    fetchRijksArtworks(),
    fetchChicagoInstituteArtworks(),
  ]);
  return metResults.concat(gettyResults, chicagoResults);
}
