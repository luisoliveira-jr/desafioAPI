const knex = require("../conection-db");

const newMovie = async (req, res) => {
    const {
        title,
        description,
        image,
        imagetitle,
        imagesmall,
        trailer,
        video,
        releaseyear,
        limitage,
        genre,
        isseries } = req.body;

    if (req.user.isadmin) {
        try {        
            const newMovie = await knex('movies').insert({
                title,
                description,
                image,
                imagetitle,
                imagesmall,
                trailer,
                video,
                releaseyear,
                limitage,
                genre,
                isseries
            }).returning('*');

            if (!newMovie[0]) {
                return res.status(400).json({ message: "Unable to register movie" })
            };

            return res.status(201).json({ message: `Movie: ${title} registered successfully!` })

        } catch (error) {
            return res.status(500).json({ message: `Internal server error when registering movie. details: ${error.message}` })
        };
    } else {
        return res.status(403).json({ message: "You are not allowed!" });
    };

};

const getMovie = async (req, res) => {
    const { id } = req.params
    try {
        const detailedMovie = await knex('movies').where({ id }).returning('*');

        return res.status(200).json(detailedMovie)
    } catch (error) {
        return res.status(500).json({ message: `Internal server error, getting movie. details: ${error.message}` })
    };
};

const getAllMovies = async (req, res) => {
    try {
        const movies = await knex('movies')
        return res.status(200).json(movies)
    } catch (error) {
        return res.status(500).json({ mensagem: error.message })
    };

};

const updateMovie = async (req, res) => {
    if (req.user.isadmin) {
        const { id } = req.params;
        const {
            title,
            description,
            image,
            imagetitle,
            imagesmall,
            trailer,
            video,
            releaseyear,
            limitage,
            genre,
            isseries } = req.body;

        try {

            if (title) {
                await knex('movies').where({ id }).update({ title })
            };

            if (description) {
                await knex('movies').where({ id }).update({ description })
            };

            if (image) {
                await knex('movies').where({ id }).update({ image })
            };

            if (imagetitle) {
                await knex('movies').where({ id }).update({ imagetitle })
            };

            if (imagesmall) {
                await knex('movies').where({ id }).update({ imagesmall })
            };

            if (trailer) {
                await knex('movies').where({ id }).update({ trailer })
            };

            if (video) {
                await knex('movies').where({ id }).update({ video })
            };

            if (releaseyear) {
                await knex('movies').where({ id }).update({ releaseyear })
            };

            if (limitage) {
                await knex('movies').where({ id }).update({ limitage })
            };

            if (genre) {
                await knex('movies').where({ id }).update({ genre })
            };

            if (isseries) {
                await knex('movies').where({ id }).update({ isseries })
            };

            return res.status(204).send()
        } catch (error) {
            return res.status(500).json({ message: `Internal server error, updating movie. details: ${error.message}` })
        };
    } else {
        return res.status(403).json({ message: "You are not allowed!" });
    };
};

const deleteMovie = async (req, res) => {
    if (req.user.isadmin) {
        const { id } = req.params;

        try {
            const movie = await knex('movies').del().where({ id }).returning('id')

            if (!movie) {
                return res.status(400).json({ message: "Unable to delete movie" })
            };

            return res.status(204).send()
        } catch (error) {
            return res.status(500).json({ message: `Internal server error deleting movie. details: ${error.message}` })
        };
    } else {
        return res.status(403).json({ message: "You are not allowed!" });
    };
};

module.exports = {
    newMovie,
    getMovie,
    getAllMovies,
    updateMovie,
    deleteMovie,
}