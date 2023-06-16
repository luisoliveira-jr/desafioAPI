const express = require("express")

const validateRequisitionBody = require("../middle/validateRequisitionBody")

const { schemaUser, UpdateUserEmailSchema }  = require("../models/user" )
const { emailRepeated}  = require("../middle/intermediateUsers")     
const { register, getUser, updateUser } = require("../controllers/users")

const { verifyLogin, authenticateLogin } = require("../middle/intermediateAuth")
const { performLogin } = require("../controllers/auth")

const { MovieSchema }  = require("../models/movie" )
const { newMovie, getMovie, getAllMovies, updateMovie, deleteMovie, getRandom } = require("../controllers/movies")

const router = express()

router.post("/register", validateRequisitionBody(schemaUser), emailRepeated, register)
router.post("/login", verifyLogin, performLogin)

router.use(authenticateLogin)

router.get("/users", getUser)
router.put("/users", validateRequisitionBody(UpdateUserEmailSchema), emailRepeated, updateUser)

router.post("/movies", validateRequisitionBody(MovieSchema), newMovie)
router.get("/movies", getAllMovies)
router.get("/movies/:id", getMovie)
router.put("/movies/:id", validateRequisitionBody(MovieSchema), updateMovie)
router.delete("/movies/:id", deleteMovie)

module.exports = router