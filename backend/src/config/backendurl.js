



router.get('/api/config', (req, res) => {
    res.json({ backendUrl: process.env.BACKEND_URL });
  });
  