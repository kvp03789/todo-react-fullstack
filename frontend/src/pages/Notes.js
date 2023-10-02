import { useEffect, useState } from "react";
import NoteItem from "../components/NoteItem";
import useAuthContext from "../hooks/useAuthContext";
import AddNoteGrey from "../img/add-note.svg"
import NewNotesForm from "../components/NewNotesForm";

const Notes = () => {

    const [notesList, setNotesList] = useState([])
    const [showNewNoteForm, setShowNewNoteForm] = useState(false)
    const { user } = useAuthContext()

    const handleNewNoteClick = () => {
        console.log("make a new note")
        setShowNewNoteForm(!showNewNoteForm)
    }
    
    const handleNoteItemClick = (editBoolean) => {
        console.log("clicked a note", editBoolean)
    }

    const handleDisplay = () => {
        setShowNewNoteForm(!showNewNoteForm)
    }

    useEffect(() => {
        const fetchNotes = async () => {
            const options = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                }
            }
            const response = await fetch(
                process.env.NODE_ENV === "development" || "test" 
                ? `http://localhost:4000/api/projects/notes/${user._id}`
                : `https://todo-react-fullstack-production.up.railway.app/api/projects/notes/${user._id}`,
                options)

            const json = await response.json()

            if(!response.ok){
                console.log("something went wrong fetching notes: ", json)
            }
            if(response.ok){
                console.log("notes fetched, it worked!: ", json)
                setNotesList(json)
                console.log("DEBUG: heres the notes list from Notes", notesList)
            }
        }
        fetchNotes()
        }, []
    )

    return ( 
        <div className="project-container">
            <div className="project-title-container">
                <h1>Notes</h1>
            </div>
            <div className="notes-task-container">
                {
                notesList.map(note => (
                    <NoteItem note={note} handleNoteItemClick={handleNoteItemClick} notesList={notesList} setNotesList={setNotesList}/>
                ))
                }
                {!showNewNoteForm && 
                    <div className="new-notes-button-container" onClick={handleNewNoteClick}>
                        <img src={AddNoteGrey} className="small-svg button-pointer" id="add-note-svg"></img>
                    </div>
                }
                {showNewNoteForm &&
                    <div className="new-notes-form-container">
                        <NewNotesForm handleDisplay={handleDisplay} notesList={notesList} setNotesList={setNotesList}/>
                    </div>
                }
            </div>
            
        </div>
     );
}
 
export default Notes;