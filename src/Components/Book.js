import React, { useState } from "react"
import ReactModal from "react-modal"

const Book = ({ book, handleDelete, handleEdit }) => {

  const [showSynopsisModal, setShowSynopsisModal] = useState(false)

  return (
    <>
      <div className="col-sm-4">
        <div className="card">
          <div className="card-block">
            <li key={book._id}>
              {book.title}<br />
              <img className="bookImage" src={book.image}></img><br />
              <button onClick={()=> {
                 setShowSynopsisModal(true)
              }}>Book Information</button>
              <button onClick={() => {
                handleDelete(book)
              }}>Delete</button><button onClick={() => {
                handleEdit(book)
              }}>Edit</button>
            </li>
          </div>
        </div>
      </div>
      <ReactModal isOpen={showSynopsisModal}>
        <div>
          {book.genre}<br />
          {book.synopsis}<br />
          <details>
            <summary>Is there an AudioBook?</summary>
            {book.audio ? <p>Yes</p> : <p>No</p>}
            {book.link}
          </details>
          {book.price}<br />
        </div>
        <button onClick={()=>{ setShowSynopsisModal(false)}}> close </button>
      </ReactModal>
    </>
  )


}
export default Book