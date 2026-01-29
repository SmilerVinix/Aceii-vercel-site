import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { name, original, ending } = req.body;

  if (!name || !original || !ending) return res.status(400).json({ error: "Missing fields" });

  // Load existing links
  const filePath = path.join(process.cwd(), "data.json");
  let data = {};
  if (fs.existsSync(filePath)) data = JSON.parse(fs.readFileSync(filePath, "utf-8"));

  const fullName = `${name}${ending.startsWith('.') ? ending : '.'+ending}`;

  if (data[fullName]) return res.status(409).json({ error: "This link already exists" });

  // Save
  data[fullName] = original;
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

  // Return new short link
  const shortLink = `https://acee/${fullName}`;
  res.status(200).json({ shortLink });
}
