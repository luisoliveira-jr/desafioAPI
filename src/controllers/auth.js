const jwt = require("jsonwebtoken")
const knex = require("../conection-db")

const performLogin = async (req, res) => {
    const {email, userpassword} = req.body

    try {
        const user = await knex('users').where({email}).returning('*')

        const token = jwt.sign({ id: user[0].id}, process.env.PASSWORD_JWT, {expiresIn: "6h"})

        const {userpassword: _, ...userLogged } = user[0]

        return res.json({
            user: userLogged,
            token
        })
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

module.exports = {
    performLogin
}