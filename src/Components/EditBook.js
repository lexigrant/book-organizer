import React from "react"
import { useState, useEffect } from "react"
import axios from "axios"
import ReactModal from 'react-modal';
import 'bootstrap/dist/css/bootstrap.min.css';
const API_URL = process.env.REACT_APP_API_URL

const EditBook = ({refetchBooks, bookToEdit, showEditModal, closeEditModal}) => {

    const [editTitle, setEditTitle] = useState("")
    const [editImage, setEditImage] = useState("")
    const [editSynopsis, setEditSynopsis] = useState("")
    const [editGenre, setEditGenre] = useState("")
    const [editAudio, setEditAudio] = useState(false)
    const [editLink, setEditLink] = useState("")
    const [editPrice, setEditPrice] = useState(Number)
    const [editId, setEditId] = useState("")
    

    const handleEditTitleChange = (event) => {
        setEditTitle(event.target.value)
    }

    const handleEditImageChange = (event) => {
        setEditImage(event.target.value)
    }

    const handleEditSynopsisChange = (event) => {
        setEditSynopsis(event.target.value)
    }

    const handleEditGenreChange = (event) => {
        setEditGenre(event.target.value)
    }

    const handleEditAudioChange = (event) => {
        setEditAudio(event.target.checked)
    }

    const handleEditLinkChange = (event) => {
        setEditLink(event.target.value)
    }

    const handleEditPriceChange = (event) => {
        setEditPrice(event.target.value)
    }

    
    const handleEditBookSubmit = (event) => {
        event.preventDefault()
        axios.put(
            `${API_URL}/books/${editId}`,
            {
                title: editTitle,
                image: editImage, 
                synopsis: editSynopsis,
                genre: editGenre,
                audio: editAudio,
                link: editLink,
                price: editPrice
            }
        ).then(()=> {
            refetchBooks()
        })
	closeEditModal()
    }

    const populatedEditForm = (bookData) => {
            setEditTitle(bookData.title)
            setEditImage(bookData.image) 
            setEditSynopsis(bookData.synopsis)
            setEditGenre(bookData.genre)
            setEditAudio(bookData.audio)
            setEditLink(bookData.link)
            setEditPrice(bookData.price)
            setEditId(bookData._id)

    }
    useEffect(() => {
        populatedEditForm(bookToEdit)
    }, [bookToEdit])

    return (
        <ReactModal isOpen={showEditModal}>
          <p>edit here</p>
          <button className="btn btn-outline-secondary submitbutton" onClick={() => {
            closeEditModal()
          }}>Exit</button>
    
            <form className="form" onSubmit={handleEditBookSubmit}>
                <input placeholder="Title" type="text" onChange={handleEditTitleChange} value={editTitle} /><br />
                <input placeholder="Image" type="text" onChange={handleEditImageChange} value={editImage} /><br />
                <input placeholder="Synopsis" type="text" onChange={handleEditSynopsisChange} value={editSynopsis} /><br />
                <input placeholder="Genre" type="text" onChange={handleEditGenreChange} value={editGenre} /><br />
                Available as an AudioBook <input type="checkbox" defaultChecked={false} onChange={handleEditAudioChange} value={editAudio} /><br />
                <input placeholder="Link" type="text" onChange={handleEditLinkChange} value={editLink} /><br />
                <input placeholder="Price" type="number" onChange={handleEditPriceChange} value={editPrice} /><br />
                <input className="btn btn-outline-secondary submitbutton" type="submit" value="submit Book" />
            </form>
        </ReactModal>
    )
}

export default EditBook
