const express = require('express')
const router = express.Router()
const User = require('../models/user')

router.post('/create', async (req, res) => {
    try {
        const user = await User.create(req.body)
        res.status(201).send(user)
    } catch (error) {
        console.error(error)
        res.status(500).send({message: 'There was a problem trying to create a user'})
    }        
})

router.get('/', async (req, res) => {
    try {
        const users = await User.find()
        res.status(200).send(users)
    } catch (error) {
        console.error(error)
        res.status(500).send({message: 'Error getting users'})        
    }
})

router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        if(!user) {
            return res.status(404).send({message: 'User not found'})
        }
        res.status(200).send(user)
    } catch (error) {
        console.error(error)
        res.status(500).send({message: 'Error getting user'})        
    }
})

router.put('/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, {new: true})
        if (!user) {
            return res.status(404).send({message: 'User not found'})
        }
        res.status(200).send(user)
    } catch (error) {
        console.error(error)
        res.status(500).send({message: 'Error updating user'})        
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id)
        if (!user) {
            return res.status(404).send({message: 'User not found'})
        }
        res.status(200).send({message: 'User deleted successfully'})
    } catch (error) {
        console.error(error)
        res.status(500).send({message: 'Error deleting user'})
    }
})

module.exports = router