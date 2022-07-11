const {
    index,
    create,
    read,
    edit,
    remove,
} = require('../controllers/tripController');

const router = require('express').Router();

router.post('/index/:user', index);
router.post('/create', create);
router.get('/:id', read);
router.put('/:id', edit);
router.delete('/:id', remove);

module.exports = router;
