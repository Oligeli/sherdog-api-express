const express = require('express');
const sherdog = require('sherdog');
const cors = require('cors');
const app = express();

app.use(cors());

app.get('/fighter/:slug', (req, res) => {
  const slug = req.params.slug;
  const url = `https://www.sherdog.com/fighter/${slug}`;

  sherdog.getFighter(url, function(data) {
    if (!data) {
      return res.status(500).json({ error: "Could not fetch fighter data." });
    }
    res.json(data);
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Sherdog API running on port ${PORT}`);
});
