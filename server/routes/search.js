import express from "express";
import { fetchAllArtworks } from "../services/fetchArtworks.js";
import { sortArtWorks } from "../services/sortArtworksByColors.js";

const router = express.Router();

router.post("/search", async (req, res) => {
  console.log("New image uploaded");
  try {
    // Get artworks from museums api
    console.log("Starting search for artworks in museums api");
    const allArtworks = await fetchAllArtworks();

    // Sort by colors
    const { palette } = req.body;
    console.log(`Starting compairing artworks with colors ${palette}`);
    const similarArtworks = await sortArtWorks(palette, allArtworks);
    console.log("Process of sorting artworks by color completed");
    res.json(similarArtworks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err });
  }
});

export default router;
