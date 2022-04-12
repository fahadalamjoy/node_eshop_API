const express = require('express')
const router = express.Router()
const { Category } = require('../models/category')

router.get('/', async (req, res) => {
    const categoryList = await Category.find()
    if (!categoryList) {
        res.status.apply(500).json({ success: false })
    }
    res.status(200).send(categoryList)
})

router.get('/:id', async (req, res) => {
    const categoryList = await Category.findById(req.params.id)
    if (!categoryList) {
        res.status.apply(500).json({ success: false })
    }
    res.status(200).send(categoryList)
})

router.post('/', async (req, res) => {
    let category = new Category({
        name: req.body.name,
        icon: req.body.icon,
        color: req.body.color,
    })
    category = await category.save()
    if (!category) {
        return res.status(404).send('the category cannot created')
    }
    res.send(category)
})

router.put('/:id', async (req, res) => {
    let category = await Category.findByIdAndUpdate(
        req.params.id,
        {
            name: req.body.name,
            icon: req.body.icon,
            color: req.body.color,
        },
        { new: true }
    )
    category = await category.save()
    if (!category) {
        return res.status(404).send('the category cannot updated')
    }
    res.send(category)
})

router.delete('/:id', (req, res) => {
    Category.findByIdAndRemove(req.params.id)
        .then((category) => {
            if (category) {
                return res.status(200).json({
                    success: true,
                    message: 'Category Deleted Successfully',
                })
            } else {
                return res
                    .status(404)
                    .json({ success: false, message: 'category not found' })
            }
        })
        .catch((err) => {
            return res.status(404).json({ success: false, error: err })
        })
})

module.exports = router
