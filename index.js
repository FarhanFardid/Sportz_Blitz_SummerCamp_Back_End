const { MongoClient, ServerApiVersion } = require("mongodb");
const express = require("express");
const app = express();
const port = process.env.PORT || 5000;

// dotenv configuration
require("dotenv").config();

const cors = require("cors");

// Middleware
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Sports Blitz camp is going on....");
});

// sports_camp

const uri = `mongodb+srv://${process.env.DB_User}:${process.env.DB_Password}@cluster0.joz6qi9.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();
    client.connect();

   const usersCollection = client.db("SportsDB").collection("users");
   const instructorsCollection = client.db("SportsDB").collection("instructors");
   const classesCollection = client.db("SportsDB").collection("classes");
   const cartCollection = client.db("SportsDB").collection("cart");
   
 // -----------------------------
  //          Users Api
  //----------------------------- 

app.get('/users', async(req,res)=>{
  const result  =  await usersCollection.find().toArray();
  res.send(result)
})

  app.post('/users',async(req,res)=>{
    const user = req.body;
    const query = {email: user.email}
    const existingUser = await usersCollection.findOne(query);
    if(existingUser){
      return res.send({message: "user already exist"})
    }
    const result = await usersCollection.insertOne(user);
    res.send(result);
  })

  // -----------------------------
  //       Instructors Api
  //----------------------------- 
   app.get('/instructors', async(req,res)=>{
    const result = await instructorsCollection.find().toArray();
    res.send(result);
   })

    // -----------------------------
    //        classes Api
    //----------------------------- 
  app.get('/classes', async(req,res)=>{
    const result = await classesCollection.find().toArray();
    res.send(result);
  })

    // -----------------------------
    //        Class Cart Api
    //----------------------------- 
  app.post('/cart', async(req,res)=>{
    const selectedClass = req.body;
    const result = await cartCollection.insertOne(selectedClass);
    res.send(result);
    
  })
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.listen(port, () => {
  console.log("Sports camp is running on port", port);
});
