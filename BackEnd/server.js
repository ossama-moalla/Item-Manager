const express=require('express');
const cors=require('cors');
const mongoose =require('mongoose');


require('dotenv').config();

const app=express();
app.use(cors());
app.use(express.json());

app.use('/login', (req, res) => {
    res.send({
      token: 'test123'
    });
  });

const port=process.env.port||5000;

const dashboardRoutes = require("./Routes/dashboard.route");
const verifyToken = require("./Routes/validate-token");


app.use("/control/users", verifyToken, dashboardRoutes);

const database_url=process.env.DataBase_URL;
mongoose.connect(database_url,{useNewUrlParser:true,useCreateIndex:true})

const connection=mongoose.connection;
connection.once('open',()=>{
console.log('Database Connection established')});

const itemroute=require('./Routes/item.route');
const folderroute=require('./Routes/folder.route');
const userroute=require('./Routes/user.route');

app.use('/item',itemroute);
app.use('/folders',folderroute);
app.use('/user',userroute);

app.listen(port,()=>{
    console.log(`server is listening on port:${port}`);
})