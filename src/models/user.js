const joi = require("joi")

const UserSchema = joi.object({
	username: joi.string().required().messages(),
	email: joi.string().email().required().messages(),
	userpassword: joi.string().required().messages(),
	profilepic: joi.string().messages(),
	isadmin: joi.boolean().messages()
})

const UpdateUserEmailSchema = joi.object({
	username: joi.string().messages(),
	email: joi.string().email().messages(),
	userpassword: joi.string().messages(),
	profilepic: joi.string().messages(),
	isadmin: joi.boolean().messages()
})

module.exports = {
	UserSchema,
	UpdateUserEmailSchema
}