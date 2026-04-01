import express from "express";
import mongoose from "mongoose";
import {shortUrl,getOriginalUrl} from "./Controllers/url.js";
import dns from 'dns';
//change dns
dns.setServers(['1.1.1.1', '8.8.8.8']);
const app=express();
app.use(express.urlencoded({extended:true}));
app.set("views", "./views");
app.set("view engine", "ejs");

mongoose.connect("mongodb+srv://divyanshugangwar663_db_user:zTiU9qkozkuyrvfb@cluster0.qhdsiac.mongodb.net/",
    
 {
     dbName:"Url_shorter"
 } 
)
.then(()=>
    console.log("mangodb connected..!")).catch((err)=>console.log(err));

//rendering the ejs file
app.get('/',(req,res)=>{
    // res.render("index.ejs",{shortUrl:null})
    res.render("index", { shortUrl: null });
})
//shorting url logic
app.post('/short', shortUrl) 

//redirect to original url using short code :- dynamic routing
// app.get("/:shortCode",getOriginalUrl);
app.get("/url/:shortCode", getOriginalUrl);
    


const port = process.env.PORT || 2000;

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});


// zTiU9qkozkuyrvfb