const express = require('express')
const cors = require('cors')
const axios = require('axios')

const PORT = 4000;

/**----------------Dependency-----------------------------------------------------------*/
const app = express();
/**-------------------------------------------------------------------------------------*/
/**----------------API GATEWAY-----------------------------------------------------------*/
let usersMoviePath = ["users","movies"];
let ratingPath = ["rating"];

const routes = express.Router();
const router = routes.all('/*',(req,res) => {
    console.log("body",req.body)
    let config = {
        method: req.method,
        data: req.body? req.body:{},
    }
    // user path
    if (usersMoviePath.includes(req.params[0].split('/').shift())){
        console.log("Expect movie or user. Got: " + req.params[0]); //test
        config={
            ...config, //destructuring config
            url: 'http://localhost:3001/'+req.params[0],

        }
    }
    //rating path
    else if(ratingPath.includes(req.params[0].split('/').shift())){
        console.log("Expect rating. Got: " + req.params[0]); //test
        config={
            ...config,
            url:'http://localhost:3002/'+req.params[0],
        }
    }
    else{
        console.log('page does not exist');
        return res.status(404).json({message: 'endpoint not found'});
    }
    try{
        console.log({config}); //test
        axios(config).then((response)=>{
            res.send(response.data);
        }).catch(err=>{
            console.log({err})
            res.send(err);
        })
    }catch (err){
        console.log(err);
    }
})
/**-------------------------------------------------------------------------------------*/
/**--------------use [Middleware]-------------------------------------------------------*/
// >CORS
app.use(
    cors({
    
    origin: "http://localhost:3000",
    })
);

// >Express JSON (parses incoming requests with JSON payloads and is based on body-parser.)
    app.use(express.json());
// >API gateway
    app.use('/', router);
/**----------------------------------------------------------------------------------------*/
/**--------------Server Starts Here--------------------------------------------------------*/
app.listen(PORT, ()=>{console.log("API GATEWAY running on port: " + PORT + ' at ' + `http://localhost:${PORT}`)})


