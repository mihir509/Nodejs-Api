const express = require('express')
const router = express.Router();
const Item = require('../models/item');
const authenticateToken = require('../middleware/auth')

router.get('/', authenticateToken,  async(req, res)=> {
    try {
        const items = await Item.find();
        res.json(items)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

router.post('/', authenticateToken, async(req, res)=> {
    const item = new Item({
        name: req.body.name,
        description: req.body.description
    })
    try {
        const newItem = await item.save()
        res.status(201).json(newItem)
    } catch (error) {
        res.status(400).json({ message: error.message });
    }   
})

router.get('/:id', authenticateToken,  async (req, res) => {
    try {
        const item = await Item.findById(req.params.id);
        if (!item) {
            return res.status(404).json({ message: 'Item not found' });
        }
        res.json(item);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.put('/:id',authenticateToken, async (req, res) => {
    try {
        const item = await Item.findById(req.params.id);
        if (!item) return res.status(404).json({ message: 'Item not found' });

        item.name = req.body.name ?? item.name;
        item.description = req.body.description ?? item.description;

        const updatedItem = await item.save();
        res.json(updatedItem);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.delete('/:id',authenticateToken, async (req, res) => {
    try {
        const item = await Item.findById(req.params.id);
        if (!item) return res.status(404).json({ message: 'Item not found' });
        await Item.deleteOne({ _id: req.params.id });
        res.json({ message: 'Item deleted' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;
