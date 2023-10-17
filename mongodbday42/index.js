const express = require("express");
const { MongoClient } = require("mongodb");
const app = express();
// Replace the uri string with your connection string.
const uri = 'mongodb://127.0.0.1:27017';

const client = new MongoClient(uri);
async function run() {
  try {
    const database = client.db('products');
    const products = database.collection('products');

    // Query for a movie that has the title 'Back to the Future'
    const query = { name: 'Cold Water' };
    const product = await products.findOne(query);
    console.log(product)
    app.listen(3000,()=>console.log('running on port 3000'))
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

app.get('/', async (req, res) => {
    try {
      const database = client.db('products');
      const products = database.collection('products');
      const query = { name: 'Cold Water' };
      const product = await products.findOne(query);
      res.send(product);
    } catch (error) {
      console.error('Error fetching product:', error);
      res.status(500).send('Internal Server Error');
    }
  });
run().catch(console.dir);
