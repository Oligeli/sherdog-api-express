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

    // Len potrebné polia
    const fighter = {
      name: data.name,
      nickname: data.nickname,
      record: data.record,
      weight_class: data.weight_class,
      nationality: data.nationality,
      birthday: data.birthday,
      age: data.age,
      height: data.height,
      weight: data.weight,
      association: data.association,
      birthplace: data.locality
    };

    res.json(fighter);
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Sherdog API running on port ${PORT}`);
});
