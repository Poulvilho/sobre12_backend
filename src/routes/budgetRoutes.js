const {
    index,
    create,
    read,
    edit,
    remove,
    dailyBudget,
} = require('../controllers/budgetController');

const router = require('express').Router();

router.post('/index/:trip', index);
router.post('/create', create);
router.get('/:id', read);
router.put('/:id', edit);
router.delete('/:id', remove);

router.post('/dailyBudget', dailyBudget);

module.exports = router;
