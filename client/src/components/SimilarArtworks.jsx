function SimilarArtworks({ artworks, loading }) {
  if (loading) {
    return (
      <div className="mt-8 bg-neutral-900/50 rounded-xl p-8 border border-amber-900/20">
        <div className="flex items-center justify-center space-x-3">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-amber-500"></div>
          <p className="text-amber-200/70">Recherche d'œuvres similaires...</p>
        </div>
      </div>
    );
  }

  if (!artworks || artworks.length === 0) return null;

  return (
    <div className="mt-8 w-full mx-auto bg-neutral-900/50 rounded-xl p-8 border border-amber-900/20">
      <h2 className="text-2xl font-semibold text-amber-100 mb-6 flex items-center">
        Œuvres aux couleurs similaires
      </h2>

      <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 p-4">
        {artworks.map((artwork) => (
          <div key={artwork.id} className="group mb-4 w-full ">
            <div className="bg-neutral-800 border border-amber-900/20 hover:border-amber-700/50 relative">
              <div className="">
                <img
                  src={artwork.image}
                  alt={artwork.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute inset-0 p-4 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <h3 className="text-amber-100 font-semibold">
                  {artwork.title}
                </h3>
                <p className="text-amber-300 text-sm mt-1">{artwork.artist}</p>
                {/* <p className="text-amber-400/50 text-xs mt-1">{artwork.date}</p> */}
                <p className="text-amber-600 text-xs mt-2">{artwork.source}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* <p className="text-amber-300/40 text-xs text-center mt-6">
        Cliquez sur une œuvre pour en savoir plus
      </p> */}
    </div>
  );
}

export default SimilarArtworks;
