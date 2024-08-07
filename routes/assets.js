const express = require('express')
const router = express.Router()
const Asset =  require('../models/asset')
const upload = require('../middleware/upload')

router.post('/:id/assets', authenticateToken, (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ message: err });
        }
        
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        const asset = new Asset({
            title: req.body.title,
            url: req.body.url,
            item: req.params.id,
            filePath: req.file.path, // Save the file path
        });

        try {
            const newAsset = await asset.save();
            await Item.findByIdAndUpdate(req.params.id, {
                $push: { assets: newAsset._id }
            });
            res.status(201).json(newAsset);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    });
});

module.exports = router;