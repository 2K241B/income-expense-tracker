import bodyParser from "body-parser";
import express from "express";
import fs from "node:fs";
import cors from "cors";
import { db } from "./db.js";

const app = express();
const port = 8000;

app.use(bodyParser.json());
app.use(cors());

app.get('/installExtension', async (req, res) => {
  const tableQueryText = `CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`
  try {
  db.query(tableQueryText);

  res.send ("success");
  } catch (error) {
    console.log (error)
  }
});

 app.get('/', async (req, res) => {
  const tableQueryText = `
  CREATE TABLE IF NOT EXISTS users (
   id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
   email VARCHAR(255) UNIQUE NOT NULL,
   name VARCHAR(50) NOT NULL,
   password TEXT,
   avatar_img TEXT,
   createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
   updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
   currency_type TEXT DEFAULT 'MNT'

  )`;

  try {
  db.query(tableQueryText)
  }
  catch (error) {
    console.error("error")
  }
  res.send("Table created successfully");
 });

 // Create
 app.post("/users/create", async (req, res) => {
  const { email, name, password, avatar_img, currency_type } =req.body;
  const queryText = `INSERT INTO users ( email, name, password, avatar_img, currency_type) VALUES ($1, $2, $3, $4, $5) RETURNING *`;
  
  try {
  const result = await db.query(queryText, [
    email,
    name,
    password,
    avatar_img,
    currency_type
  ]);
  res.status(201).json(result.rows[0]);
} catch (err) {
  console.error(err);
  res.status(500).json({error: "Database error"});
}
 });
  

//   `;
//   try {
//     db.query(queryText)
//     }
//     catch (error) {
//       console.error("error")
//     }
//     res.send("user inserted successfully");
//  })

//  app.get("/getUsers", async (req, res) => {
//   const queryText = `
//   SELECT * FROM users
//   `;
//   try {
//     const result = await db.query(queryText);
//     res.send(result.rows);
//     }
//     catch (error) {
//       console.error("error")
//     }
//     res.send("user inserted successfully");
//  });
 

// // app.post('/', (req, res) => {
// //     res.send ("success!");
// // })


//   // app.get('/getData', (req, res) => {
    
//   //   res.send(data);
//   // })
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
