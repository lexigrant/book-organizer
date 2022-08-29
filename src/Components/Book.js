import React from "react"

const Book = ({book, handleDelete, handleEdit}) => {


return(
    <div className="col-sm-4">
    <div className="card">
      <div className="card-block">
        <li key={book._id}>
          {book.name}<br/>
          <img src={book.image}></img><br/>
          {book.genre}<br/>
          {book.synopsis}<br/>
          <details>
            <summary>Is There Audio?</summary>
            {book.audio}<br/>
            {book.link}<br/>
          </details>
          {book.price}<br/>
          <button onClick={() => {
            handleDelete(book)
          }}>Delete</button><button onClick={()=> {
            handleEdit(book)
          }}>Edit</button>
        </li>
      </div>
    </div>
  </div>
)


}
export default Book