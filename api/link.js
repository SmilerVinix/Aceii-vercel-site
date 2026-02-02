export default function handler(req, res) {
  res.setHeader("Content-Type", "text/plain");

  res.status(200).send(`
-- anything you put here is returned as raw text
print("Hello from Vercel")
  `);
}
