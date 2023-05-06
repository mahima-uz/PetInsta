const express=require("express")

const path = require('path');

const MongoDbConnect = require('./server/common/mongo_connect');

const app=express();

app.use(express.static(path.resolve(__dirname, './public')));
app.use(express.urlencoded({extended:true}))
app.get("/",(req,res)=>{
    res.sendFile(path.resolve(__dirname, './public/index.html'))
})

MongoDbConnect();

app.use(express.json());
app.use('/api', require('./server/'));

app.listen(3000,()=>console.log("Server running at port 3000"));