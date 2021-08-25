const router = require("express").Router();
const itemsController = require("../controllers/items");

router.get("/item", itemsController.getItemResults);

router.post("/item", itemsController.postQueries);

router.get("/items", itemsController.getQueries);

module.exports = router;