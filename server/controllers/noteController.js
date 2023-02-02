const Note = require('../models/Note')
const asyncHandler = require('express-async-handler')

/**
 * @desc Get all Notes
 * @route GET /notes
 * @access Private
 * 
 * .lean() to avoid getting the methods like save for the object
 */
const getAllNotes = asyncHandler(async (req, res) => {
    const notes = await Note.find().lean()

    if(!notes){
        return res.status(400).json({ message: 'No notes Found'})
    }
    res.json(notes)
})

/**
 * @desc Create new Note
 * @route POST /notes
 * @access Private
 */
const createNewNote = asyncHandler(async (req, res) => {
    const { title, content } = req.body

    // Confirm data
    if(!title) {
        return res.status(400).json({ message: 'Title is required' })
    }

    // Check for duplicates
    const duplicate = await Note.findOne({ title }).lean().exec()

    if(duplicate) {
        return res.status(409).json({ message: 'Duplicate Note'}) // 409 = conflict
    }
    
    // Create the todo object with the client request body
    const note = new Note({ 
        title: title,
        content: content 
    })

    // Save the new todo in the db
    note.save()

    res.json(note)
})

/**
 * @desc Update a Note
 * @route PATCH /notes
 * @access Private
 */
const updateNote = asyncHandler(async (req, res) => {
    // Find the todo to update
    const note = await Note.findById(req.params.id)

    // Toggle the complete value
    //todo.complete = !todo.complete

    // Save the new todo in the db
    note.save()

    res.json(note)
})

/**
 * @desc Delete a Note
 * @route DELETE /notes
 * @access Private
 */
const deleteNote = asyncHandler(async (req, res) => {
    // Find and delete the todo to delete
    const note = await Note.findByIdAndDelete(req.params.id)

    res.json(note)
})

module.exports = { 
    getAllNotes, 
    createNewNote, 
    updateNote, 
    deleteNote 
}

