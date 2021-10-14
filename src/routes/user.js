const router = require('express').Router();

router.get('/login', (req, res) => res.status(200).json({message: "Hello World!"}));

module.exports = router;