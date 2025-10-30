import { useState } from "react";

function ImageUploader({ onImageUpload }) {
  const [preview, setPreview] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
        onImageUpload(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-4 h-full">
      {!preview && (
        <div className="border-2 border-dashed border-amber-800/40 rounded-xl p-8 text-center hover:border-amber-700/60 transition bg-neutral-900/50">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
            id="file-upload"
          />
          <label htmlFor="file-upload" className="cursor-pointer">
            <div className="text-amber-200/70">
              <svg
                className="mx-auto h-12 w-12 text-amber-700/50"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <p className="mt-2 font-medium text-amber-100">
                Cliquez pour choisir une œuvre
              </p>
              <p className="text-sm text-amber-300/50 mt-1">
                PNG, JPG jusqu'à 10MB
              </p>
            </div>
          </label>
        </div>
      )}

      {preview && (
        <div className="mt-4">
          <p className="text-amber-100 hover:text-amber-300 mb-4 text-center cursor-pointer" onClick={() => setPreview(null)}>Télécharger une nouvelle image</p>
          <img
            src={preview}
            alt="Preview"
            className="max-h-96 mx-auto rounded-sm ring-1 ring-amber-900/20"
          />
        </div>
      )}
    </div>
  );
}

export default ImageUploader;
