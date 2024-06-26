// routes/items.js

const express = require('express');
const router = express.Router();
const Item = require('../models/Item');

// Get all items
router.get('/', async (req, res) => {
    try {
        const items = await Item.find().populate('owner');
        res.json(items);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Post a new item
router.post('/', async (req, res) => {
    try {
        const { title, description, image, price, owner } = req.body;
        const item = new Item({ title, description, image, price, owner });
        await item.save();
        res.status(201).json(item);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Get a specific item
router.get('/:id', async (req, res) => {
    try {
        const item = await Item.findById(req.params.id).populate('owner');
        if (!item) return res.status(404).json({ message: 'Item not found' });
        res.json(item);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Update an item
router.put('/:id', async (req, res) => {
    try {
        const { title, description, image, price, isAvailable } = req.body;
        const item = await Item.findByIdAndUpdate(req.params.id, { title, description, image, price, isAvailable }, { new: true });
        if (!item) return res.status(404).json({ message: 'Item not found' });
        res.json(item);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete an item
router.delete('/:id', async (req, res) => {
    try {
        const item = await Item.findByIdAndDelete(req.params.id);
        if (!item) return res.status(404).json({ message: 'Item not found' });
        res.json({ message: 'Item deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
