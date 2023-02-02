const express = require('express')
const router = express.Router()
const noteController = require('../controllers/noteController')

// Already at /todo here
router.route('/')
    .get(noteController.getAllNotes)
    .post(noteController.createNewNote)
    
router.route('/:id')
    .patch(noteController.updateNote)
    .delete(noteController.deleteNote)

module.exports = router