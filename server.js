



const bodyParser = require('body-parser');
const cors = require('cors');
const { MongoClient } = require('mongodb');
const express = require('express');
const app = express();
app.use(cors());
app.use(bodyParser.json());

const port = 5000;
const url = 'mongodb+srv://1910sharmaneha:Sunset@cluster0.5toireo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const database = 'Exam';

async function connect() {
  try {
    const client = new MongoClient(url);
    await client.connect();
    console.log("Connected to Mongo server");

    const db = client.db(database);
    const bill = db.collection("bill");

    app.get('/search', async (req, res) => {
      const n = req.query.ID;
      if (!n) {
        res.json({ message: 'Missing parameters' });
      } else {
        const name = await bill.findOne({ ID: n });
        if (name) {
          res.json({ message: 'User found', name });
        } else {
          res.json({ message: "User not found" });
        }
      }
    });

    app.get('/difference', async (req, res) => {
        const n = req.query.ID;
        if (!n) {
            res.json({ message: 'Missing parameters' });
        } else {
            const user = await bill.findOne({ ID: n });
            if (user) {
                const start = user.Start;
                const end = user.End;
                const difference = end - start;
                res.json({ message: 'Difference calculated', difference });
            } else {
                res.json({ message: "User not found" });
            }
        }
    });
    

    app.get('/searchAll', async (req, res) => {
        
            const rese=await bill.find().toArray();

            return res.json({rese});
    
      });
      app.post('/insert', async (req, res) => {
        const {ID,Start,End}=req.body;
        const ins=await bill.insertOne({Start,ID,End});

        return res.json({message:'Inserted values successfully'});

  });

  app.post('/update', async (req, res) => {
    const { ID, NewId } = req.body;
    const updatedDocument = await bill.findOneAndUpdate(
      { ID: ID }, // Filter condition
      { $set: { ID: NewId } }, // Update operation
      //{ returnOriginal: false } // Return the modified document
    );
  
    if (updatedDocument) {
      res.json({ message: 'Document updated successfully' });
    } else {
      res.json({ message: 'Document with given ID not found' });
    }
  });

  app.post('/delete', async (req, res) => {
    const { ID, NewId } = req.body;
    const updatedDocument = await bill.findOneAndDelete(
      { ID: ID } 
    );
  
    if (updatedDocument) {
      res.json({ message: 'Document deleted successfully' });
    } else {
      res.json({ message: 'Document with given ID not found' });
    }
  });

  } catch (e) {
    console.error("Could not connect to server", e);
  }
  app.listen(port, () => console.log(`Listening to port ${port}`));
}

connect();
