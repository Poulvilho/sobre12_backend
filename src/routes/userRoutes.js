const {
    login,
    register,
    edit,
} = require('../controllers/userController');

const router = require('express').Router();

router.post('/register', register);
router.post('/login', login);
router.post('/:id', edit);

module.exports = router;
