const {
    index,
    create,
    remove
} = require('../controllers/spectatorController');

const router = require('express').Router();

router.post('/index', index);
router.post('/create', create);
router.delete('/:trip/:spectated/:user', remove);

module.exports = router;
