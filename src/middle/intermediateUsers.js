const knex = require("../conection-db")

const emailRepeated = async (req, res, next) => {
    const { email } = req.body

    try {

        if(email){
            const emailRepeated = await knex('users').where({email}).first()
            if (emailRepeated) {
            return res.status(400).json({message: "Email already registered"})
            }
        }
       

        next()
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
};

module.exports = { 
    emailRepeated
}