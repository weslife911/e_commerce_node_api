const { getAllUsers, getUser } = require("../controllers/AuthController");

const router = require("express").Router();

router.get("/users", getAllUsers);
router.get("/user/:id", getUser);
router.get('/current_user', (req, res) => {
    res.send(req.user);
});

module.exports = router;