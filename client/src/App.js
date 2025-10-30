import { useState } from "react";
import ColorThief from "colorthief";
import ImageUploader from "./components/ImageUploader";
import ColorPalette from "./components/ColorPalette";
import SimilarArtworks from "./components/SimilarArtworks";
import { searchMuseums } from "./services/museumService";

function App() {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [colors, setColors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [similarArtworks, setSimilarArtworks] = useState([]);
  const [searchingArtworks, setSearchingArtworks] = useState(false);

  const handleImageUpload = (imageData) => {
    setUploadedImage(imageData);
    setSimilarArtworks([]); // Reset les suggestions précédentes
    extractColors(imageData);
  };

  const extractColors = async (imageData) => {
    setLoading(true);

    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.src = imageData;

    img.onload = async () => {
      const colorThief = new ColorThief();
      const palette = colorThief.getPalette(img, 6);
      setColors(palette);
      setLoading(false);
      await searchSimilarArtworks(palette);
    };
  };

  const searchSimilarArtworks = async (palette) => {
    setSearchingArtworks(true);
    try {
      const artworks = await searchMuseums(palette);
      setSimilarArtworks(artworks);
    } catch (error) {
      console.error("Erreur lors de la recherche:", error);
    } finally {
      setSearchingArtworks(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-900">
      {/* Header */}
      <header className="bg-neutral-950 border-b border-amber-900/20">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <h1 className="text-4xl font-bold text-amber-100">Pigmentum</h1>
          <p className="text-amber-200/70 mt-1">Explorateur de couleurs</p>
        </div>
      </header>

      {/* Contenu principal */}
      <main className="px-4 py-8">
        <div className="max-w-4xl mx-auto bg-neutral-800 rounded-2xl shadow-2xl p-8 border border-amber-900/10">
          <ImageUploader onImageUpload={handleImageUpload} />

          {loading && (
            <div className="text-center mt-8">
              <p className="text-amber-200/60">Extraction des couleurs...</p>
            </div>
          )}

          <ColorPalette colors={colors} />
        </div>
        <SimilarArtworks
          artworks={similarArtworks}
          loading={searchingArtworks}
        />
      </main>
    </div>
  );
}

export default App;
