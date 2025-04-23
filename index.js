const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const cors = require('cors');

const app = express();
app.use(cors());

app.get('/fighter/:slug', async (req, res) => {
  const slug = req.params.slug;
  const url = `https://www.sherdog.com/fighter/${slug}`;

  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    const name = $('span.fn[itemprop="name"]').text().trim();
    const nickname = $('span[itemprop="alternateName"]').text().replace(/["]/g, '').trim();
    const record = $('span[itemprop="record"]').text().trim();

    const getText = (label) => {
      const match = $(`div.bio span:contains("${label}")`).parent().text();
      return match ? match.replace(label, '').trim() : '';
    };

    const getStrongText = (label) => {
      const match = $(`strong:contains("${label}")`).parent().text();
      return match ? match.replace(label, '').trim() : '';
    };

    const weight_class = getStrongText("Weight Class:");
    const nationality = getStrongText("Nationality:");
    const birthday = getStrongText("Date of Birth:");
    const height = getStrongText("Height:");
    const weight = getStrongText("Weight:");
    const association = getStrongText("Association:");
    const birthplace = getStrongText("Born:");

    res.json({
      name,
      nickname,
      record,
      weight_class,
      nationality,
      birthday,
      height,
      weight,
      association,
      birthplace
    });

  } catch (err) {
    res.status(500).json({ error: "Failed to fetch or parse data." });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Custom Sherdog API running on port ${PORT}`);
});
