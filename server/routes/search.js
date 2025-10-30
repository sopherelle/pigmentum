import express from "express";
import { fetchAllArtworks } from "../services/fetchArtworks.js";
import { sortArtWorks } from "../services/sortArtworksByColors.js";

const router = express.Router();

router.post("/search", async (req, res) => {
  try {
    // Get artworks from museums api
    const allArtworks = await fetchAllArtworks();

    // Sort by colors
    const { palette } = req.body;
    const similarArtworks = await sortArtWorks(palette, allArtworks);
    res.json(similarArtworks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err });
  }
});

export default router;
