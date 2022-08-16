const express = require('express');
const config =  require('./../config/db_config')
const app = express()
const movies = require('./route/movie')
const users = require('./route/user')
const cors = require("cors");

app.set('PORT',3001)

// app.use(
//     cors({
//         credentials: true,
//         origin: "http://localhost:4000",
//     })
// );
app.use(express.json());

//listen to all incoming request from the API gateway (path )...localhost:4000/rating/
//(consumes the resource of rating API at PORT)
app.use('/movies',movies);
app.use('/users',users);
app.use(express.urlencoded({ extended: true }))

app.listen(app.get('PORT'), ()=>{console.log("MOVIES API running on port: " + app.get('PORT'))});