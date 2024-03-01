const router = require("express").Router();
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("../swagger-output.json");

router.use("/api-docs", swaggerUi.serve);
router.get("/api-docs", swaggerUi.setup(swaggerDocument));
const Controller = require("../controllers/controller");
const authentication = require("../middlewares/authentication");
const authorization = require("../middlewares/authorization");

// Endpoint ini tanpa perlu melewati authentication
router.post("/register", Controller.register);
router.post("/login", Controller.login);

router.use(authentication); // Perlu dilakukan authentication terlebih dahulu

router.get("/heros", Controller.readHeros); // Menampilkan hero dari seorang user yang telah registrasi dan login
router.get("/favourites", Controller.readFavourites); // Untuk menampilkan favourites dari user
router.post("/favourites/:heroId", Controller.addFavourite); // Untuk post hero favourites

// // Routes below need authentication and authorization
router.put("/favourites/:id", authorization, Controller.editFavourites); //

module.exports = router;
