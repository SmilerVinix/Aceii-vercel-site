import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { name, original, ending } = req.body;
  if (!name || !original || !ending) return res.status(400).json({ error: "Missing fields" });

  const filePath = path.join(process.cwd(), "data.json");
  let data = {};
  if (fs.existsSync(filePath)) data = JSON.parse(fs.readFileSync(filePath, "utf-8"));

  const slug = `${name}${ending.startsWith('.') ? ending : '.'+ending}`;

  if (data[slug]) return res.status(409).json({ error: "This link name is already taken" });

  // Save
  data[slug] = original;
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

  const shortLink = `https://acee/${slug}`;
  res.status(200).json({ shortLink });
}
