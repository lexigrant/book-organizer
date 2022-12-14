import React from "react"
import { useState } from "react"
import axios from "axios"
import 'bootstrap/dist/css/bootstrap.min.css';
const API_URL = process.env.REACT_APP_API_URL

const NewBook = ({refetchBooks}) => {

    const [newTitle, setNewTitle] = useState("")
    const [newImage, setNewImage] = useState("")
    const [newSynopsis, setNewSynopsis] = useState("")
    const [newGenre, setNewGenre] = useState("")
    const [newAudio, setNewAudio] = useState(false)
    const [newLink, setNewLink] = useState("")
    const [newPurchase, setNewPurchase] = useState("")
    const [newPrice, setNewPrice] = useState(Number)

    const handleNewTitleChange = (event) => {
        setNewTitle(event.target.value)
    }

    const handleNewImageChange = (event) => {
        setNewImage(event.target.value)
    }

    const handleNewSynopsisChange = (event) => {
        setNewSynopsis(event.target.value)
    }

    const handleNewGenreChange = (event) => {
        setNewGenre(event.target.value)
    }

    const handleNewAudioChange = (event) => {
        setNewAudio(event.target.checked)
    }

    const handleNewLinkChange = (event) => {
        setNewLink(event.target.value)
    }

    const handleNewPurchaseChange = (event) => {
        setNewPurchase(event.target.value)
    }

    const handleNewPriceChange = (event) => {
        setNewPrice(event.target.value)
    }

    const handleNewBookSubmit = (event) => {
        event.preventDefault()
        axios.post(
            `${API_URL}/books`,
            {
                title:newTitle,
                image:newImage, 
                synopsis:newSynopsis,
                genre:newGenre,
                audio:newAudio,
                link:newLink,
                purchase:newPurchase,
                price:newPrice
            }
        ).then(()=> {
            setNewTitle("")
            setNewImage("")
            setNewSynopsis("")
            setNewGenre("")
            setNewAudio("")
            setNewLink("")
            setNewPurchase("")
            setNewPrice("")
            refetchBooks()
        })
    }

    return (
        <section className="top">
            <h1 className="header">Create a Book Listing</h1>
            <form className="form" onSubmit={handleNewBookSubmit}>
                <input placeholder="Title" type="text" onChange={handleNewTitleChange} value={newTitle} /><br />
                <input placeholder="Image" type="text" onChange={handleNewImageChange} value={newImage} /><br />
                <input placeholder="Synopsis" type="text" onChange={handleNewSynopsisChange} value={newSynopsis} /><br />
                <input placeholder="Genre" type="text" onChange={handleNewGenreChange} value={newGenre}/><br />
                <h3 className="audiobook">Available as an AudioBook</h3> <input type="checkbox" className="checked" defaultChecked={false} onChange={handleNewAudioChange} value={newAudio}/><br />
                { newAudio ? <div><input placeholder="Link" type="text" onChange={handleNewLinkChange} value={newLink}/><br /></div> : undefined}
                <input placeholder="Price" type="number" onChange={handleNewPriceChange} value={newPrice}/><br />
                <input placeholder="Purchase Link" type="text" onChange={handleNewPurchaseChange} value={newPurchase}/><br/>
                <input className="btn btn-secondary submitbutton" type="submit" value="submit Book" />
            </form>
        </section>
    )
}

export default NewBook