require('dotenv').config()
const fs = require('fs')
const path = require('path')
const {Sequelize, DataTypes } = require('sequelize');
const sequelize = require('./sequelize_setup');

const address = require('../models/address');
const contact = require('../models/contact');
const movie = require('../models/movie');
const role = require('../models/role');
const seenMovie=require('../models/seenMovie');
const user = require('../models/user');

/**------------------------Establishing/Testing Connection--------------------**/

try {
     sequelize.authenticate().then(()=>console.log('Connection has been established successfully.'));

} catch (error) {
    console.error('Unable to connect to the database:', error);
}
/**------------------------------------------------------------------------**/


/**------------------------Database Object Module---------------------------**/


let database = {};

database.sequelize = sequelize;
database.Sequelize = Sequelize;

database.address = address;
database.contact = contact;
database.movie = movie;
database.role = role;
database.seenMovie= seenMovie;
database.user = user;

//Relationship Mapping (In case JAVA Backend Fails) (See adv java JPA exam) -Otherwise comment this out-

    //>>One to One [Contact-User]
database.user.hasOne(database.contact);
database.contact.belongsTo(database.user);

    //>>Many to One [Contact-Address]
database.contact.hasOne(database.address);
database.address.belongsTo(database.contact);

    //>>One to Many [Role-User]
database.user.hasOne(database.role);
database.role.belongsTo(database.user);

    //>>Many to Many [User-Movie] through associative table [SeenMovie]
database.user.hasMany(database.seenMovie);
database.seenMovie.belongsTo(database.user);

database.movie.hasMany(database.seenMovie);
database.seenMovie.belongsTo(database.movie);


/**--------------------CREATE Tables & Insert Movie------------------------**/
database.sequelize.sync({force:true}).then(()=> {
    
    insertMovies();
})

/**------------------------------------------------------------------------**/

/**------------------------Insert Movies Function--------------------------**/
//if no movies in the DB then load from file-- Ideally load from JAVA Backend
const insertMovies =()=>{
    database.movie.findAll()
        .then((movies) =>{
            if (movies.length === 0){
                const raw = fs.readFileSync(path.join(__dirname, '../../', "movies.json"));

                const movies = JSON.parse(raw);
                //console.log(movies);
                database.movie.bulkCreate(movies).then(()=>console.log("Movies Inserted"))
                    .catch((err)=>{
                        console.log("Error inserting Movies. ", err);
                    });
                // console.log("Movies Inserted");
            }
        })

}
/**------------------------------------------------------------------------**/


module.exports = database;
