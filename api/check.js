export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { username } = req.body;

    if (!username) {
      return res.status(400).json({ error: "Missing username" });
    }

    const r = await fetch(
      "https://users.roblox.com/v1/usernames/validate",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "User-Agent": "Mozilla/5.0"
        },
        body: JSON.stringify({ username })
      }
    );

    const data = await r.json();
    res.status(200).json(data);
  } catch (e) {
    res.status(500).json({ error: "Proxy failed" });
  }
}
