const {
    index,
    register,
    emailValidation,
    login,
    forgotPassword,
    read,
    edit,
    remove,
} = require('../controllers/userController');

const router = require('express').Router();

router.get('/index', index);
router.post('/register', register);
router.post('/emailValidation', emailValidation);
router.post('/forgotPassword', forgotPassword);
router.post('/login', login);
router.get('/:id', read);
router.put('/:id', edit);
router.delete('/:id', remove);

module.exports = router;
