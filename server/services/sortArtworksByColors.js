import { getDominantColor, colorDistance } from "../utils/color.js";

export async function sortArtWorks(palette, artworks) {
  // Get dominant color for each artwork
  const artWorksWithColors = await Promise.all(
    artworks.map(async (art) => {
      const dominant = await getDominantColor(art.image);
      return { ...art, dominant };
    })
  );
  console.log(`Colors extrated for ${artWorksWithColors.length} artworks`);
  // Sort artworks with palette from given image
  const sortedArtworks = artWorksWithColors
    .map((art) => {
      if (!art.dominant) return { ...art, score: Infinity };
      console.log(`Checking color distance for ${art.title}`);
      const distances = palette.map((color) =>
        colorDistance(color, art.dominant)
      );
      const score = Math.min(...distances);
      return { ...art, score };
    })
    .sort((a, b) => a.score - b.score);
  console.log("All artworks have been sorted by colors");
  return sortedArtworks.slice(0, 15);
}
