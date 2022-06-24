const {
    index,
    create,
    read,
    edit,
    remove,
} = require('../controllers/subcategoryController');

const router = require('express').Router();

router.post('/index/:trip', index);
router.post('/create', create);
router.get('/:id', read);
router.put('/:id', edit);
router.delete('/:id', remove);

module.exports = router;
