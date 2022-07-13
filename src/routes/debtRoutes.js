const {
    myDebts,
    myCredits,
    read,
    edit,
    remove,
} = require('../controllers/debtController');

const router = require('express').Router();

router.post('/myDebts/:trip/:user', myDebts);
router.post('/myCredits/:trip/:user', myCredits);
router.get('/:cost/:user', read);
router.put('/:cost/:user', edit);
router.delete('/:cost/:user', remove);

module.exports = router;
