const mongoose = require('mongoose')
const Schema = mongoose.Schema;

/**-------------------Connection Properties---------------------------------**/

const mongo_uri= "mongodb+srv://root:toor@movieproject.xtqcfqw.mongodb.net/test";
/**------------------------------------------------------------------------**/

/**-------------------Schema Definition------------------------------------**/
const ratingSchema = new Schema({
    movie: {
        type: Number,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
    },
}, {
    timestamps: true,
});
/**------------------------------------------------------------------------**/

/**-------------------Connection to Mongo----------------------------------**/

//ref from Advanced Javascript. ldandoy repo

mongoose.connect(mongo_uri);

mongoose.connection.on("connected", () => {
    console.log("Mongoose database connected.");
});

mongoose.connection.on("error", (err) => {
    console.log("Mongoose Error.", err);
});

module.exports = mongoose.model("Ratings",ratingSchema)

/**------------------------------------------------------------------------**/