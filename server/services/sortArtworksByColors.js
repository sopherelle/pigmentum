import { getDominantColor, colorDistance } from "../utils/color.js";

export async function sortArtWorks(palette, artworks) {
  // Get dominant color for each artwork
  const artWorksWithColors = await Promise.all(
    artworks.map(async (art) => {
      const dominant = await getDominantColor(art.image);
      return { ...art, dominant };
    })
  );

  // Sort artworks with palette from given image
  const sortedArtworks = artWorksWithColors
    .map((art) => {
      if (!art.dominant) return { ...art, score: Infinity };
      const distances = palette.map((c) => colorDistance(c, art.dominant));
      const score = Math.min(...distances);
      return { ...art, score };
    })
    .sort((a, b) => a.score - b.score);

  console.log("SORTED", sortedArtworks[0], sortedArtworks[155]);
  return sortedArtworks.slice(0, 15);
}
