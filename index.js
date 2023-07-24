const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config()
const port = process.env.PORT || 5000;
const college = require('./college.json')


// middlware

app.use(cors())
app.use(express.json())




const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.aifxgic.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();


    const collegeCollection = client.db("campusDB").collection('college');

    app.get('/college', async(req, res) => {
        const result = await collegeCollection.find().toArray();
        res.send(result)
    })

    app.get('/college', (req, res) => {
      res.send(college)
    })

    app.get('/college/:id', (req, res) => {
      const id = req.params.id;
      console.log(id);
      const selectedCollege = college.find(c => c.id == id)
      res.send(selectedCollege)
    })



    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);






app.get('/', (req, res) => {
    res.send('college is running')
})

app.listen(port, () => {
    console.log(`college is running on port ${port}`);
})