const knex = require("../conection-db")
const bcrypt = require("bcrypt")

const register = async (req, res) => {
    const { username, email, userpassword, profilepic, isadmin } = req.body;

    try {
        const encryptedPassword = await bcrypt.hash(userpassword, 10);

        const newUser = await knex('users').insert({
            username,
            email,
            userpassword: encryptedPassword,
            profilepic, 
            isadmin
        }).returning('*');
        
        if (!newUser[0]) {
            return res.status(400).json({message: "Unable to register user"})
        };

        return res.status(201).json({message: `User: ${username} registered successfully!`})
    } catch (error) {
        return res.status(500).json({message: `Internal server error when registering user. details: ${error.message}`})
    };
};

const getUser = async (req, res) => {
    const {id} = req.user;
    try {
        const detailedUser = await knex('users').where({id}).returning('*');
        
        const {userpassword: _, ...user} = detailedUser[0];
        
        return res.status(200).json(user)
    } catch (error) {
        return res.status(500).json({message: `Internal server error, getting user. details: ${error.message}`})
    };
};

const updateUser = async (req, res) => {
    const { id } = req.user;
    const { username, email, userpassword, profilepic, isadmin } = req.body;

    try {            

        if(username){
            await knex('users').where({id}).update({ username })
        };

        if(email){
            await knex('users').where({id}).update({ email })
        };

        if(userpassword){
            const encryptedPassword = await bcrypt.hash(userpassword, 10)
            await knex('users').where({id}).update({ userpassword: encryptedPassword })
        };

        if(profilepic){
            await knex('users').where({id}).update({ profilepic })
        };

        if(isadmin){
            await knex('users').where({id}).update({ isadmin })
        };
        
        return res.status(204).send()
    } catch (error) {
        return res.status(500).json({message: `Internal server error, updating user. details: ${error.message}`})
    };
};

module.exports = {
    register,
    getUser,
    updateUser
}