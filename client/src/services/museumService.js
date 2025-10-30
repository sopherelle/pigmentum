export const searchMuseums = async (palette) => {
  const res = await fetch("http://localhost:3001/api/search", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ palette }),
  });
  return res.json();
};
