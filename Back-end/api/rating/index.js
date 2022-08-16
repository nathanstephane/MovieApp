const express = require('express');
const app = express()
const routes = require('./route/rating')
const cors = require("cors");

app.set('PORT',3002)

// app.use(
//     cors({
//         credentials: true,
//         origin: "http://localhost:4000",
//     })
// );
app.use(express.json());

//listen to all incoming request from the API gateway (path )...localhost:4000/rating/
//(consumes the resource of rating API at PORT)
app.use('/rating',routes);
app.use(express.urlencoded({ extended: true }))

app.listen(app.get('PORT'), ()=>{console.log("RATING API running on port: " + app.get('PORT'))});