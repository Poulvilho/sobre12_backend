const {
    index,
    register,
    emailValidation,
    login,
    edit,
    remove,
} = require('../controllers/userController');

const router = require('express').Router();

router.get('/index', index);
router.post('/register', register);
router.post('/emailValidation/:id', emailValidation);
router.post('/login', login);
router.put('/:id', edit);
router.delete('/:id', remove);

module.exports = router;
