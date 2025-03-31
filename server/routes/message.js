// server/routes/message.js
const express = require('express');
const Message = require('../models/Message');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const messages = await Message.find();
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

router.post('/', async (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: 'Message text is required' });
  }

  try {
    const newMessage = new Message({ text });
    await newMessage.save();
    res.status(201).json({ message: 'Message added successfully', data: newMessage });
  } catch (err) {
    res.status(500).json({ error: 'Failed to add message' });
  }
});

router.put('/:id', async (req, res) => {
  const { text } = req.body;
  const { id } = req.params;

  if (!text) {
    return res.status(400).json({ error: 'Message text is required' });
  }

  try {
    const updatedMessage = await Message.findByIdAndUpdate(id, { text }, { new: true });
    if (!updatedMessage) {
      return res.status(404).json({ error: 'Message not found' });
    }
    res.json({ message: 'Message updated successfully', data: updatedMessage });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update message' });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedMessage = await Message.findByIdAndDelete(id);
    if (!deletedMessage) {
      return res.status(404).json({ error: 'Message not found' });
    }
    res.json({ message: 'Message deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete message' });
  }
});

module.exports = router;
