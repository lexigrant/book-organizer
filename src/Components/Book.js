import React, { useState } from "react"
import ReactModal from "react-modal"
import { Carousel } from "react-bootstrap"

const Book = ({ book, handleDelete, handleEdit }) => {

  const [showSynopsisModal, setShowSynopsisModal] = useState(false)

  return (
    <>
      <div className="col-sm-4">
        <div className="card" >
          <div className="card-block">
            <li key={book._id}>
              {book.title}<br />
              <img className="bookImage" src={book.image}></img><br />
              <button className="one" onClick={()=> {
                 setShowSynopsisModal(true)
              }}>Book Information</button>
              <button className="one" onClick={() => {
                handleDelete(book)
              }}>Delete</button>
              <button className="one" onClick={() => {
                handleEdit(book)
              }}>Edit</button>
            </li>
          </div>
        </div>
      </div>
      <ReactModal isOpen={showSynopsisModal}>
        <div>
          Genre: {book.genre}<br />
          Synopsis: {book.synopsis}<br />
          <details>
            <summary>Is there an AudioBook?</summary>
            {book.audio ? 
            
              <div><p>Yes</p> 
              <button id="media"><a href={book.link}>click for audible</a></button></div>
            : <p>No</p>}
             
            
          </details>
          Book price: ${book.price}<br />
        </div>
        <button onClick={()=>{ setShowSynopsisModal(false)}}>close</button>
      </ReactModal>
    </>
  )


}
export default Book