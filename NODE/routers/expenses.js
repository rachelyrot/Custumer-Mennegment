
const express = require('express')
const { saveExpenses, getExpensesByMonth, getExpensesByYear, getExpensesBetweenDates } = require("../modules/expenses");
const { checkBodyContainsKeys } = require('../utils/middleware')
const router = express.Router()

router.get('/getExpensesByMonth/:month',async (req, res)=>{
    try{
    const{month}=req.params
    const expenses = await getExpensesByMonth(month)
    res.status(200).json(expenses)
    }catch(error){
        res.status(500).send(error.message)
    }
})

router.get('/getExpensesByYear/:year',async (req,res)=>{
    try{
        const{year}=req.params
        const expenses = await getExpensesByYear(year)
        res.status(200).json(expenses)
    }catch(error){
        res.status(500).json(error.message)
    }
})

router.get('/getExpensesBetweenDates/:startDate/:endDate',async(req, res)=>{
    try{
    const{startDate} = req.params
    const {endDate}  = req.params
    const expenses = await getExpensesBetweenDates(startDate, endDate)
    res.status(200).json(expenses)
    }catch(error){
        res.status(500).send(error.message)
    }
})

router.use(express.json())
router.post('/issuingExpenses',checkBodyContainsKeys( ["date","sum","supplier","Payment","Detailes"]),async(req,res)=>{
    try{
        const expenses=req.body
        const newExpenses=await saveExpenses(expenses)
        res.status(201).json(newExpenses)

    }
    catch(error){
        res.status(500).send(error.message)
    }
})
module.exports=router