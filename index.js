var express = require("express");   
var app = express();
var cors=require("cors")

var locationsApiRouter=require('./routes/locationsApi')       
var dataApiRouter=require('./routes/dataApi')                 
var searchApiRouter=require('./routes/searchApi')             
var countApiRouter=require('./routes/countApi')               

var port = process.env.PORT || 3001;

app.use(express.json())
app.use(cors())
app.use(express.json());

app.use('/list',locationsApiRouter)                           // api to return the location of battles
app.use('/data',dataApiRouter)                                // api to return the deatils of all the battles
app.use('/count',countApiRouter)                              // api to return the count of battles
app.use(searchApiRouter)                                      // api to return the details of a specific battle


app.get("/", (req, res) => {                                  // home page
  res.sendFile(__dirname + "/home.html");
});


app.listen(port, () => {
    console.log("Server listening on port " + port);
});