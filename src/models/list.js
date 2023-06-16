const joi = require("joi")

const ListSchema = joi.object({
	title: joi.string().required().messages(),
	type: joi.string().messages(),
    genre: joi.string().messages(),
    content: joi.array().messages(),
})

module.exports = ListSchema