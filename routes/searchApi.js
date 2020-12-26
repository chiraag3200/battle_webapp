var express=require('express')
var router=new express.Router()
const mongodb = require("mongodb");
const mongoose = require("mongoose");

mongoose.Promise = global.Promise;
const MongoClient = mongodb.MongoClient;
const connectionUrl = "mongodb+srv://chiraagmittal05:qazplm@battledb.hd8am.mongodb.net/test"; 
const databaseName = "battleDB"; 

var searchData = []


router.post("/search", (request, response) => {
  MongoClient.connect(connectionUrl, {useNewUrlParser:true}, (error,client) => {
    if (error) {
      return console.log(
        "Unable to Search.Please try after sometime."
      );
    }
      const db=client.db(databaseName);

      db.collection('data').find({ $or: [ { attacker_king: request.body.king }, {defender_king: request.body.king} ], location:request.body.location, battle_type: request.body.type }).toArray((error,result) => {
        if(!result){
            return response.status(404).send({
            message: "No battle exists"
          });
        }
        response.send(result)
        searchData = result
      })
  })
});



// router.get("/search",function(request,response){
//   console.log(searchData, "fd")
//     response.send(searchData)
// })

module.exports=router 