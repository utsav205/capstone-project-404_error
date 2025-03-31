const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

const dbURI = "mongodb+srv://mern:jayganjawala18@cluster0.hpplq.mongodb.net/signApp?retryWrites=true&w=majority&appName=Cluster0";

const messageRoute = require('./routes/message');

app.use(cors());
app.use(express.json());

mongoose.connect(dbURI)
  .then(() => console.log('MongoDB Connected to Atlas'))
  .catch((err) => console.log('MongoDB connection error: ', err));

app.use('/api/message', messageRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
