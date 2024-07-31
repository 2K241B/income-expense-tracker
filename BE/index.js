import bodyParser from "body-parser";
import express from "express";
const app = express();
const port = 8000;

const data = [];

app.use(bodyParser.json());


app.post('/addData', (req, res) => {
    console.log(req.body, 'request');

    data.push(req.body)
    res.send ("success!");
})


  app.get('/getData', (req, res) => {
    
    res.send(data);
  })
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })
