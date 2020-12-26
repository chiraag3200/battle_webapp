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

app.use('/list',locationsApiRouter)
app.use('/data',dataApiRouter)
app.use('/count',countApiRouter)
app.use(searchApiRouter)


app.get("/", (req, res) => {
  res.sendFile(__dirname + "/home.html");
});


app.listen(port, () => {
    console.log("Server listening on port " + port);
});