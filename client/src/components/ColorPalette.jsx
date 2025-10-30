function ColorPalette({ colors }) {
  if (!colors || colors.length === 0) return null;

  const rgbToHex = (rgb) => {
    return '#' + rgb.map(x => {
      const hex = x.toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    }).join('');
  };

  return (
  <div className="mt-8">
    <h2 className="text-2xl font-semibold text-amber-100 mb-6">Palette extraite</h2>
    <div className="flex gap-6 flex-wrap justify-center">
      {colors.map((color, index) => {
        const hexColor = rgbToHex(color);
        return (
          <div key={index} className="text-center group">
            <div
              className="w-24 h-24 rounded-full shadow-2xl cursor-pointer hover:scale-110 transition-all duration-300 ring-2 ring-amber-900/30 hover:ring-amber-700/50"
              style={{ backgroundColor: hexColor }}
              title={hexColor}
            />
            <p className="mt-3 text-sm font-mono text-amber-300/80 group-hover:text-amber-200 transition">
              {hexColor}
            </p>
          </div>
        );
      })}
    </div>
  </div>
);
}

export default ColorPalette;