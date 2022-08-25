const {
    index,
    create,
    edit,
    remove
} = require('../controllers/guestController');

const router = require('express').Router();

router.get('/index/:trip', index);
router.post('/create', create);
router.put('/:trip/:user', edit);
router.delete('/:trip/:user', remove);

module.exports = router;
