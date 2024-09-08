const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors()); // This will allow all origins

app.post('/api/save-segment', (req, res) => {
  // Handle your request
  res.send('Segment saved');
});

app.listen(5000, () => {
  console.log('Server running on port 5000');
});
