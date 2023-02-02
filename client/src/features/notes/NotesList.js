import React from 'react'
import { useState, useEffect } from 'react'
import { FaTrash, FaEdit } from 'react-icons/fa'

const API_BASE = 'http://localhost:3001'

const NotesList = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState({title: '', content: ''})
  const [popupActive, setPopupActive] = useState(false)
  const [popupTitle, setPopupTitle] = useState('')
  const [popupContent, setPopupContent] = useState('')

  useEffect(() => {
    getNotes()

    console.log(notes)
  }, [])

  const getNotes = async () => {
    const data = await fetch(API_BASE + '/notes')
      .then(result => result.json())
      .then(data => setNotes(data))
      .catch(err => console.error('Error: ', err))
  }

  const addNote = async () => {
    console.log("New Note title = ", newNote.title)
    console.log("New Note content = ", newNote.content)
    console.log("New Note = ", newNote)
    const data = await fetch(API_BASE + '/notes', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        title: newNote.title,
        content: newNote.content
      })
    }).then(res => res.json())

    setNotes([...notes, data])
    setNewNote({ title: '', content: ''})
  }

  const deleteNote = async (id) => {
    const data = await fetch(API_BASE + '/notes/' + id, { method: 'DELETE' })
      .then(res => res.json())

    setNotes(notes => notes.filter(note => note._id !== data._id))
  }

  const editNote = async (id) => {
    setPopupActive(true)
  }

  const NewNoteTitle = (e) => {
    setNewNote({title: e.target.value, content: newNote.content})
  }

  const NewNoteContent = (e) => {
    setNewNote({title: newNote.title, content: e.target.value})
  }

  return (
    <div>
      <h1>Awesome Notes</h1>
      <h4>Here are your notes</h4>


      <div className='notes'>

        <div className='add--note'>
          <div className='new-note'>
            <span className='note--forms'>
              <input
                type='text'
                className='new--note-title'
                placeholder='Enter a title'
                onChange={NewNoteTitle}
                value={newNote.title}
              ></input>
              <input
                type='text'
                className='new--note-content'
                placeholder='Enter the content of the note'
                onChange={NewNoteContent}
                value={newNote.content}
              ></input>
            </span>
          </div>
          <button className='note--add' onClick={addNote}>+</button>
        </div>

        {notes.slice(0).reverse().map(note => (
          <div className='note' key={note._id}>
            <span className='note-header'>
              <h2 className='note--title'>{note.title}</h2>
              <span className='note--header-buttons'>
                <button className='note--edit' onClick={(e) => {e.stopPropagation(); editNote(note._id)}}><FaEdit size={25}/></button>
                <button className='note--trash' onClick={(e) => {e.stopPropagation(); deleteNote(note._id)}}><FaTrash size={25} /></button>
              </span>
            </span>
            <p className='note--content'>{note.content}</p>
          </div>
        ))}
        {popupActive ? (
          <div className='popUp'>
            <div className='add--note'>
            <div className='closePopup' onClick={() => setPopupActive(false)}>x</div>
            <div className='new-note'>
              <span className='note--forms'>
                <input
                  type='text'
                  className='new--note-title'
                  placeholder='Enter Title'
                  onChange={NewNoteTitle}
                  value={newNote.title}
                ></input>
                <input
                  type='text'
                  className='new--note-content'
                  placeholder='Enter the content of the note'
                  onChange={NewNoteContent}
                  value={newNote.content}
                ></input>
              </span>
            </div>
            </div>
          </div>
        ) : ''}
      </div>
    </div>
  )
}

export default NotesList