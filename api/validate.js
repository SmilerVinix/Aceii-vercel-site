export default async function handler(req, res) {
  const { username, birthday } = req.query;

  if (!username || !birthday) {
    return res.status(400).json({ error: "Missing parameters" });
  }

  try {
    const robloxRes = await fetch(
      "https://users.roblox.com/v1/usernames/validate",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "User-Agent": "Mozilla/5.0"
        },
        body: JSON.stringify({
          username,
          birthday,
          context: "Signup"
        })
      }
    );

    const data = await robloxRes.json();

    // Roblox logic:
    // code === 0 → available
    // code !== 0 → taken / invalid
    res.json({
      available: data.code === 0,
      message: data.message || null
    });

  } catch (err) {
    res.status(500).json({ error: "Validation failed" });
  }
}
