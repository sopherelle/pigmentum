import { Vibrant } from "node-vibrant/node";

export async function getDominantColor(imageUrl) {
  try {
    const res = await fetch(imageUrl, {
      headers: { "User-Agent": "Mozilla/5.0" },
    });
    if (!res.ok) throw new Error(`HTTP error! ${res.status}`);

    const buffer = await res.arrayBuffer();

    const palette = await Vibrant.from(Buffer.from(buffer)).getPalette();

    const rgb =
      palette.Vibrant?.rgb ||
      palette.Muted?.rgb ||
      palette.LightVibrant?.rgb ||
      palette.DarkMuted?.rgb;

    return rgb || null;
  } catch (err) {
    console.error("Erreur extraction couleur:", err.message);
    return null;
  }
}

export function colorDistance(rgb1, rgb2) {
  return Math.sqrt(
    Math.pow(rgb1[0] - rgb2[0], 2) +
      Math.pow(rgb1[1] - rgb2[1], 2) +
      Math.pow(rgb1[2] - rgb2[2], 2)
  );
}
