import Vibrant from "node-vibrant";

export async function getDominantColor(imageUrl) {
  try {
    const palette = await Vibrant.from(imageUrl).getPalette();
    const rgb = palette.Vibrant?.rgb || palette.Muted?.rgb;
    if (!rgb) return null;
    return rgb;
  } catch (e) {
    console.error("Erreur extraction couleur:", e);
    return null;
  }
}

export function colorDistance(rgb1, rgb2) {
  return Math.sort(
    Math.pow(rgb1[0] - rgb2[0], 2) +
      Math.pow(rgb1[1] - rgb2[1], 2) +
      Math.pow(rgb1[2] - rgb2[2], 2)
  );
}
