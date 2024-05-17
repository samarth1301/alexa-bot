const express = require('express');
const port = process.env.PORT || 3000
//for CORS access
const cors = require('cors');
//for Parsing JSON
const bodyParser = require('body-parser');
const dfRoutes = require('./routes/dialogFlow');
const app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.json());
app.use(cors());
require('dotenv').config()

//test URL
app.get('/test',async (req,res)=>{
    return res.json({result : "server is running and this is a test endpoint"})
})


//dialog flow routes
app.use('/df',dfRoutes);

app.listen(port, ()=>{
    console.log(`server is up and running at ${port}`);
});