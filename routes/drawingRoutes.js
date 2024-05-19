const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/authMiddleware');

const Drawing = require('../models/Drawing');

// @route    POST api/drawings
// @desc     Save a drawing
// @access   Private
router.post(
  '/',
  [auth, [check('drawing', 'Drawing is required').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { drawing } = req.body;

    try {
      const newDrawing = new Drawing({
        user: req.user.id,
        drawing,
      });

      const savedDrawing = await newDrawing.save();

      res.json(savedDrawing);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// @route    GET api/drawings
// @desc     Get all drawings of the logged-in user
// @access   Private
router.get('/', auth, async (req, res) => {
  try {
    const drawings = await Drawing.find({ user: req.user.id }).sort({ date: -1 });
    res.json(drawings);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;