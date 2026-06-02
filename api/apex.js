export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const WEBHOOK = 'https://script.google.com/macros/s/AKfycbyT0-1CZihl40uxVrQ6bp1zP8OJ2sNEm_8Mcn9yNDbqpO1BzHuTLjUzAHdKx7WfhJW9/exec';

  try {
    if (req.method === 'POST') {
      const response = await fetch(WEBHOOK, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(req.body)
      });
      const data = await response.json();
      return res.status(200).json(data);
    }

    if (req.method === 'GET') {
      const action = req.query.action || 'read';
      const response = await fetch(`${WEBHOOK}?action=${action}`);
      const data = await response.json();
      return res.status(200).json(data);
    }
  } catch(e) {
    return res.status(500).json({ error: e.toString() });
  }
}
