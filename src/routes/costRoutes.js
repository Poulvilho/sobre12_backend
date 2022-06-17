const {
    index,
    create,
    read,
    edit,
    remove,
} = require('../controllers/costController');

const router = require('express').Router();

router.post('/index/:trip/:user', index);
router.post('/create', create);
router.get('/:id', read);
router.put('/:id', edit);
router.delete('/:id', remove);

module.exports = router;
