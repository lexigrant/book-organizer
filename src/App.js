import './App.css'
import React from 'react'
import { useState, useEffect } from "react"
import axios from "axios"
import Book from './Components/Book'
import NewBook from './Components/NewBook'
import 'bootstrap/dist/css/bootstrap.min.css'
import EditBook from './Components/EditBook'
import Dropdown from 'react-bootstrap/Dropdown'
import { Carousel } from "react-bootstrap"
// require('dotenv').config()
const API_URL = process.env.REACT_APP_API_URL


const App = () => {
  const [books, setBooks] = useState([])
  const [bookToEdit, setBookToEdit] = useState(undefined)
  const [showEditModal, setShowEditModal] = useState(false)
  const [activeCategory, setActiveCategory] = useState("")
  const [index, setIndex] = useState(0)

  const handleSelect = (selectIndex) => {
    setIndex(selectIndex)
  }


  const refetchBooks = () => {
    axios.get(`${API_URL}/books`)
      .then((response) => {
        setBooks(response.data)
      })
  }
  const handleDelete = (bookData) => {
    axios.delete(`${API_URL}/${bookData._id}`)
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
    axios.get(`${API_URL}/books`)
      .then((response) => {
        setBooks(response.data)
      })
  }, [])

  return (
    <main>
      <h1>Book Organizer</h1>
      <NewBook refetchBooks={refetchBooks} />
      <section>
        <h2>Books Added</h2>
        <Dropdown>
          <Dropdown.Toggle variant="secondary">Categories</Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item className="dropdown-item" href="#" onClick={() => {
              setActiveCategory("")
            }}>All</Dropdown.Item>
            <Dropdown.Item className="dropdown-item" href="#" onClick={() => {
              setActiveCategory("Fantasy")
            }}>Fantasy</Dropdown.Item>
            <Dropdown.Item className="dropdown-item" href="#" onClick={() => {
              setActiveCategory("Fiction")
            }}>Fiction</Dropdown.Item>
            <Dropdown.Item className="dropdown-item" href="#" onClick={() => {
              setActiveCategory("Literary Fiction")
            }}>Literary Fiction</Dropdown.Item>
            <Dropdown.Item className="dropdown-item" href="#" onClick={() => {
              setActiveCategory("Romance")
            }}>Romance</Dropdown.Item>
            <Dropdown.Item className="dropdown-item" href="#" onClick={() => {
              setActiveCategory("Self-Help")
            }}>Self-Help</Dropdown.Item>
            <Dropdown.Item className="dropdown-item" href="#" onClick={() => {
              setActiveCategory("Science Fiction")
            }}>Science Fiction</Dropdown.Item>
            <Dropdown.Item className="dropdown-item" href="#" onClick={() => {
              setActiveCategory("Spiritual")
            }}>Spiritual</Dropdown.Item>
            <Dropdown.Item className="dropdown-item" href="#" onClick={() => {
              setActiveCategory("Thriller")
            }}>Thriller</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <ul>
          <Carousel activeIndex={index} >
            <div className="container">
              <div className="row justify-content-center">
                {books.slice(0,6).map((book) => {
                  return (
                    // if book.genre === activeCategory then make the book
                    // else dont
                    book.genre === activeCategory || activeCategory === "" ? <Book book={book} handleDelete={handleDelete} handleEdit={handleEdit} /> : undefined
                  )
                })}
              </div>
            </div>
          </Carousel>
        </ul>
        {bookToEdit ? <EditBook refetchBooks={refetchBooks} bookToEdit={bookToEdit} showEditModal={showEditModal} closeEditModal={closeEditModal} /> : undefined}
      </section>
    </main>
  )
}

export default App;
