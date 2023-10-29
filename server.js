const express = require('express');
const { MongoClient } = require('mongodb');
const asyncHandler = require('express-async-handler');
const cors = require('cors');
const port = process.env.PORT || 5000;

const uri =
  'mongodb+srv://baden:pigiron@pigiron.qzbmjdh.mongodb.net/?retryWrites=true&w=majority';
const client = new MongoClient(uri);
const dbname = 'PigIron';
const collection_name = 'slush';
const collection = client.db(dbname).collection(collection_name);

const app = express();
app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

const connectToDatabase = async () => {
  try {
    await client.connect();
    console.log(`Connected to the ${dbname} database`);
  } catch (err) {
    console.error(`Error connecting to the ${dbname} database`);
  }
};

app.get(
  '/slush',
  asyncHandler(async (req, res) => {
    try {
      await connectToDatabase();
      let result = await collection.find().toArray();
      res.status(200).json({ result });
    } catch (error) {
      console.log(error);
    }
    // res.status(200).json({ result: 'Test Slush AWS' });
  })
);

app.listen(port, () => console.log(`Server started on port ${port}`));
