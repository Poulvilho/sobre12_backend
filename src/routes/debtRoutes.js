const {
    index,
    read,
    edit,
    payDebt,
    remove,
} = require('../controllers/debtController');

const router = require('express').Router();

router.post('/myDebts/:trip/:user', index);
router.post('/payDebt/:cost/:user', payDebt);
router.get('/:cost/:user', read);
router.put('/:cost/:user', edit);
router.delete('/:cost/:user', remove);

module.exports = router;
