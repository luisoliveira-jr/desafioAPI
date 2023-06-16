const joi = require("joi")

const MovieSchema = joi.object({
	title: joi.string().required().messages(),
	description: joi.string().required().messages(),
	image: joi.string().required().messages(),
	imagetitle: joi.string().messages(),
	imagesmall: joi.string().messages(),
    trailer: joi.string().messages(),
    video: joi.string().messages(),
    releaseyear: joi.string().messages(),
    limitage: joi.number().messages(),
    genre: joi.string().messages(),
    isseries: joi.boolean().messages(),
})

module.exports = {
    MovieSchema
}