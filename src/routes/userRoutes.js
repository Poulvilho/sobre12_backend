const {
    login,
    register,
    index,
    edit,
    remove,
} = require('../controllers/userController');

const router = require('express').Router();

router.get('/index', index);
router.post('/register', register);
router.post('/login', login);
router.put('/:id', edit);
router.delete('/:id', remove);

module.exports = router;
