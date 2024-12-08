const express = require('express');
const router = express.Router();
const expenseControl = require('../controllers/expense');

router.post('/',expenseControl.createExpense);
router.get('/:id',expenseControl.getOne);
router.get('/',expenseControl.getAll);
router.put('/:id',expenseControl.updateExpense);
router.delete(':id',expenseControl.deleteExpense);

module.exports = router;