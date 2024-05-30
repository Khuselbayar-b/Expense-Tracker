const { addExpense, getExpense, deleteExpense } = require('../controllers/expense')
const { addIncome, deleteIncome, getIncomes } = require('../controllers/income')

const router = require('express').Router()

router.post('/add-income', addIncome)
    .get('/get-income', getIncomes)
    .delete('/delete-income/:id', deleteIncome)
    .post('/add-expense', addExpense)
    .get('/get-expense', getExpense)
    .delete('/delete-expense/:id', deleteExpense)


module.exports = router
//trans