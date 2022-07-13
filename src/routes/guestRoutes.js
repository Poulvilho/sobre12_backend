const { index, create, remove } = require('../controllers/guestController');

const router = require('express').Router();

router.get('/index/:trip', index);
router.post('/create', create);
router.delete('/:trip/:user', remove);

module.exports = router;
