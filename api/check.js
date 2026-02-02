export default async function handler(req, res) {
  const username = req.query.username;
  if (!username) {
    return res.status(400).json({ error: "No username provided" });
  }

  try {
    const url = `https://auth.roblox.com/v1/usernames/validate?request.username=${encodeURIComponent(username)}`;
    const response = await fetch(url);
    const data = await response.json();

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: "failed to check" });
  }
}
