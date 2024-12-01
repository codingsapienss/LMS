const express = require("express");
const { registerUser, loginUser } = require("../../controllers/AuthController");
const authenticate = require("../../middleware/auth-middleware");
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

router.get("/check-auth", authenticate, (req, res) => {
  const user = req.user;

  res.status(200).json({
    success: true,
    message: "Authenticated User",
    data: {
      user: user,
    },
  });
});

module.exports = router;
