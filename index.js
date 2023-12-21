
const express = require('express');
const cors = require('cors')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config()
const app = express()
const port = process.env.PORT || 5000;


app.use(cors());
app.use(express.json())

 
const uri =`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ktgpsav.mongodb.net/?retryWrites=true&w=majority`;



const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
}); 

async function run() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    // COLLECTIONS
   
    const taskCollection = client.db('TaskManagement').collection('tasks')


// GET ROUTE--------------------------
// ONGOING POST GET ROUTE

    app.get('/all-tasks', async(req, res) => {
      const status = req.query.status;
      const query = {status:status}
      const result = await taskCollection.find(query).toArray()
      res.send(result)
    })

// POST ROUTE-------------------------

// ADD TASK POST ROUTE

    app.post('/add-task', async(req, res) => {
      const task = req.body;
      const result = await taskCollection.insertOne(task)
      res.send(result)
    })


    // DELETE ROUTE-------------------

    // TASK DELETE ROUTE
    
    app.delete('/delete-task/:id', async (req, res) => {
      const id = req.params.id;
      console.log('param id', id)
      const query = {_id: new ObjectId(id)}
      const result = await taskCollection.deleteOne(query)
      console.log(query)
      res.send(result)

    })


    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // await client.close();
  }
}
run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('Task Management server is running')
})

app.listen(port, () => {
  console.log(`Server is running at PORT: ${port}`)
})