// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const app = express();

// app.use(cors());
// app.use(express.json());

// // MongoDB connection
// mongoose.connect('mongodb://localhost:27017/visualizationDB', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
// .then(() => console.log('MongoDB connected'))
// .catch(err => console.error(err));

// // Schema (dynamic)
// const DataSchema = new mongoose.Schema({}, { strict: false });
// const Data = mongoose.model('Data', DataSchema);

// // API: Get all data
// app.get('/api/data', async (req, res) => {
//   const data = await Data.find({});
//   res.json(data);
// });

// // API: Filtered data
// app.get('/api/data/filter', async (req, res) => {
//   const { end_year, topic, sector, region, pestle, source, country, city } = req.query;
//   const query = {};
//   if (end_year) query.end_year = end_year;
//   if (topic) query.topic = topic;
//   if (sector) query.sector = sector;
//   if (region) query.region = region;
//   if (pestle) query.pestle = pestle;
//   if (source) query.source = source;
//   if (country) query.country = country;
//   if (city) query.city = city;

//   const data = await Data.find(query);
//   res.json(data);
// });

// // Server start
// const PORT = 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/visualizationDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error(err));

// Schema (dynamic)
const DataSchema = new mongoose.Schema({}, { strict: false });
const Data = mongoose.model('Data', DataSchema, 'entries'); // use 'entries' collection

// API: Get all data
app.get('/api/data', async (req, res) => {
  const data = await Data.find({}).limit(100); // limit to avoid memory errors
  res.json(data);
});

// API: Filtered data
app.get('/api/data/filter', async (req, res) => {
  const { end_year, topic, sector, region, pestle, source, country, city } = req.query;
  const query = {};
  if (end_year) query.end_year = end_year;
  if (topic) query.topic = topic;
  if (sector) query.sector = sector;
  if (region) query.region = region;
  if (pestle) query.pestle = pestle;
  if (source) query.source = source;
  if (country) query.country = country;
  if (city) query.city = city;

  const data = await Data.find(query).limit(100);
  res.json(data);
});

// Server start
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
