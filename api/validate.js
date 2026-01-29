export default async function handler(req, res) {
  const { username, birthday } = req.query;

  if (!username || !birthday) {
    return res.status(400).json({ error: "Missing params" });
  }

  try {
    const r = await fetch("https://users.roblox.com/v1/usernames/validate", {
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
    });

    const data = await r.json();

    res.json({
      available: data.code === 0,
      code: data.code,
      message: data.message || null
    });

  } catch (e) {
    res.status(500).json({ error: "Roblox request failed" });
  }
}
