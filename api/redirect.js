import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  const { slug } = req.query;
  if (!slug) return res.status(400).send("Missing slug");

  const filePath = path.join(process.cwd(), "data.json");
  if (!fs.existsSync(filePath)) return res.status(404).send("Link not found");

  const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  const original = data[slug];
  if (!original) return res.status(404).send("Link not found");

  // Redirect to original link
  res.writeHead(302, { Location: original });
  res.end();
}
