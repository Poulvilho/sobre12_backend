const {
    index,
    create,
    read,
    edit,
    remove,
    addGuest,
} = require('../controllers/tripController');

const router = require('express').Router();

router.post('/index/:user', index);
router.post('/create', create);
router.get('/:id', read);
router.put('/:id', edit);
router.delete('/:id', remove);

router.post('/addGuest', addGuest);

module.exports = router;
