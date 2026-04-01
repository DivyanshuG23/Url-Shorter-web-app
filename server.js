import express from "express";
import mongoose from "mongoose";
import {shortUrl,getOriginalUrl} from "./Controllers/url.js";
const app=express();
app.use(express.urlencoded({extended:true}));
app.set("view engine", "ejs");
mongoose
    .connect("mongodb://divyanshugangwar663_db_user:6YHDKPcFi83MIR0x@ac-zrffpz9-shard-00-00.j9riwxt.mongodb.net:27017,ac-zrffpz9-shard-00-01.j9riwxt.mongodb.net:27017,ac-zrffpz9-shard-00-02.j9riwxt.mongodb.net:27017/?ssl=true&replicaSet=atlas-w63j91-shard-0&authSource=admin&appName=Cluster0",
{
    dbName:"node1_master"
}
)
.then(()=>
    console.log("mangodb connected..!")).catch((err)=>console.log(err));

//rendering the ejs file
app.get('/',(req,res)=>{
    res.render("index.ejs",{shortUrl:null})
})
//shorting url logic
app.post('/short', shortUrl) 

//redirect to original url using short code :- dynamic routing
app.get("/:shortCode",getOriginalUrl);
    


const port = process.env.PORT || 1000;

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});



//live link of this project:-https://url-shorter-web-app-production.up.railway.app/