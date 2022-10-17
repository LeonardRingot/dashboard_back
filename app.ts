require('dotenv').config()
const cors = require('cors');


const express = require ('express');

const app = express()
var corsOptions = {
    origin: "http://localhost:3000"
  };
  //On se lie au localhost 3000 ( le client )
app.use(cors(corsOptions));


app.use(express.json())
const port = process.env.PORT || 5000
app.listen(port, () => {
    console.log(`Serveur lancer sur Port ${port}`)
})


require('./routes/auths/login')(app)




