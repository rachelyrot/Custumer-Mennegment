const express = require('express')
const{getAllCustomers, createCustomer} = require('../modules/customers')

const{checkBodyContainsKeys} = require ('../utils/middleware')

const router = express.Router()

router.get('/getAllCustomers',async(req,res)=>{
    const customers = await  getAllCustomers()
    res.status(200).json(customers)
})

router.use(express.json())

router.post('/createCustomer',checkBodyContainsKeys(['userName','name','phone']),async(req,res)=>{
    try{
    const customer = req.body
    const newCustomer = await createCustomer(customer)
    res.status(200).json(newCustomer)
}catch(error){
    res.status(500).send(error.message)
}

})

module.exports = router