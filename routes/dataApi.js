var express=require('express')
var router=express.Router()
const mongodb = require("mongodb");
const mongoose = require("mongoose");

mongoose.Promise = global.Promise;
const MongoClient = mongodb.MongoClient;
const connectionUrl = "mongodb+srv://chiraagmittal05:qazplm@battledb.hd8am.mongodb.net/test"; 
const databaseName = "battleDB"; 

var data = []
MongoClient.connect(connectionUrl, {useNewUrlParser:true}, (error,client) => {
    if(error){
      console.log(error)
    }
    const db=client.db(databaseName);

    db.collection('data').find({battle_number: {$exists: true}}).toArray((error,result) => {
        if(!result){
            return response.status(404).send({
            message: "No battle exists"
          });
        }
        data=result
      })
})


router.get("/",function(req,res){
    res.send(data)
})

module.exports=router 