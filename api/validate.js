const WEBHOOK = "https://discord.com/api/webhooks/1466364089411436691/2h92K9LE53h21xA-w8EVBr1k_5epU4MkzgC1SZWXShtrtrhua5v2b6lKCSFsV_0t7zmX";

export default async function handler(req, res) {
  const { username } = req.query;
  if (!username) return res.json({ error: "No username" });

  try {
    const r = await fetch("https://users.roblox.com/v1/usernames/validate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username,
        birthday: "2000-01-01",
        context: "Signup"
      })
    });

    const d = await r.json();

    const available = d.code === 0;

    if (available && WEBHOOK) {
      await fetch(WEBHOOK, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: `✅ **AVAILABLE ROBLOX USERNAME**\n\`${username}\``
        })
      });
    }

    res.json({
      available,
      reason: d.message || "Unavailable",
      code: d.code
    });

  } catch {
    res.status(500).json({ error: "Request failed" });
  }
}
