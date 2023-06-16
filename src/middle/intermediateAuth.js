const knex = require("../conection-db")
const jwt = require('jsonwebtoken')
const bcrypt = require("bcrypt")

const verifyLogin = async (req, res, next) => {
    const {email, userpassword} = req.body

    try {
        const user = await knex('users').where({email}).returning('*')            
        const performLogin = await bcrypt.compare(userpassword, user[0].userpassword)    
        
        if (!user[0]) {
            return res.status(400).json({message: "Invalid username and/or password"})
        }
    
        if (!performLogin) {
            return res.status(400).json({message: "Invalid username and/or password"})
        } 

        next()
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
};

const authenticateLogin = async (req, res, next) => {
    const { authorization } = req.headers

    if (!authorization) {
        return res.status(401).json({message: "User not logged in."})
    }

    const token = authorization.split(" ")[1]

    try {
        const { id } = jwt.verify(token, process.env.PASSWORD_JWT)
        
        const user = await knex('users').where({id}).returning('*')

        if (!user[0]) {
            return res.status(401).json({message: "Unauthorized user"})
        }

        const { userpassword: _, ...userVerified} = user[0]
        
        req.user = userVerified
        
        next()
    } catch (error) {
        return res.status(400).json({message: "Error logging in user"})
    }
};

module.exports = { 
    verifyLogin,
    authenticateLogin
}