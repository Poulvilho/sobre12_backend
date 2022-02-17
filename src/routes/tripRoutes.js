const {
    index,
    create,
    read,
    edit,
    remove,
} = require('../controllers/tripController');

const router = require('express').Router();

router.get('/index/:id', index);
router.post('/create', create);
router.get('/:id', read);
router.put('/:id', edit);
router.delete('/:id', remove);

module.exports = router;
