const Rating = require('../../models/rating');
const Movie = require('../../models/movie');
const httpError = require('http-errors')


const rateMovie = async (req, res, next) => {
    try {
        const id = req.params.id;
        const { rating } = req.body;
        const movie = await Movie.findByPk(id);

        if (!movie) {
            return next(httpError(404,"Movie not found"));
        }

        if(!rating) {
            return res.json({message: "Please specify rating"});
        }
        else{
            const rate = new Rating({
                movie: id,
                rating,
            })
            await rate.save();
        }

        const ratings = await Rating.find({ movie: id });
        let total = 0;
        for (const count of ratings) {
            total += count.rating;
        }
        const average = total / ratings.length;
        await movie.update({
            rating: average.toFixed(2),
        });
        res.status(200).send(movie);
    } catch (error) {
        return res.json({message: error});
    }
};
module.exports= {rateMovie};