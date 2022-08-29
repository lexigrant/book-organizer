import './App.css'
import React from 'react'
import {useState, useEffect} from "react"
import axios from "axios"
import Book from './Components/Book'
import NewBook from './Components/NewBook'
import 'bootstrap/dist/css/bootstrap.min.css';
import EditBook from './Components/EditBook'
import ReactModal from "react-modal"


const App = () => {
  const [books, setBooks] = useState([])
  const [bookToEdit, setBookToEdit] = useState(undefined)
  const [showEditModal, setShowEditModal] = useState(false)
  
  

  const refetchBooks = () => {
    axios.get("http://localhost:3003/books")
    .then((response) => {
      setBooks(response.data)
    })
  }
  const handleDelete = (bookData) => {
    axios.delete(`http://localhost:3003/books/${bookData._id}`)
    .then(() => {
      refetchBooks()
    })
  }
  const closeEditModal = () => {
    setShowEditModal(false)
  }
  const handleEdit = (bookData) => {
    setBookToEdit(bookData)
    setShowEditModal(true)
  }
  useEffect(() => {
    axios.get("http://localhost:3003/books")
    .then((response) => {
      setBooks(response.data)
    })
  }, [])

  return(
    <main>
      <h1>Book Organizer</h1>
      <NewBook refetchBooks={refetchBooks} />
      <section>
        <h2>Books Added</h2>
        <ul>
          <div className="container">
            <div className="row">
              {books.map((book) => {
                return(
                 <Book book={book} handleDelete={handleDelete} handleEdit={handleEdit}  />
                )
              })}
            </div>
          </div>
        </ul>
       {bookToEdit ? <EditBook refetchBooks={refetchBooks} bookToEdit={bookToEdit} showEditModal={showEditModal} closeEditModal={closeEditModal}/> : undefined}
      </section>
    </main>
  )
}

export default App;
