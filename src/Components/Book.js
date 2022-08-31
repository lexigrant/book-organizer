import React, { useState } from "react"
import { Card, Container, Col, Button } from "react-bootstrap"
import ReactModal from "react-modal"
import { Carousel } from "react-bootstrap"



const Book = ({ book, handleDelete, handleEdit }) => {

  const [showSynopsisModal, setShowSynopsisModal] = useState(false)

  return (
    <>
    
          
          
          <Card className="card m-3" style={{width:'18rem'}}>  
            <p key={book._id}>
              <Card.Title style={{height:"80px", marginTop:"20px"}}>{book.title}<br /></Card.Title>
              <Card.Img variant="top" src={book.image} style={{height:"300px"}}/><br />
              <Card.Body>
              <Button className="one" onClick={()=> {
                 setShowSynopsisModal(true)
              }}>Book Information</Button>
              <Button className="one" onClick={() => {
                handleDelete(book)
              }}>Delete</Button>
              <Button className="one" onClick={() => {
                handleEdit(book)
              }}>Edit</Button>
              </Card.Body>
            </p>
            </Card>
            
           
          
    
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