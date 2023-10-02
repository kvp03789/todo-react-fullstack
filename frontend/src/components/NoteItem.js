import { useState, useEffect} from 'react'
import Delete from '../img/delete.svg'
import EditNote from '../img/edit-note.svg'
import GreenCircleCheck from '../img/green-circle-check.svg'
import Cancel from '../img/cancel.svg'
import useAuthContext from '../hooks/useAuthContext'

const NoteItem = (props) => {

    useEffect(() => {

    }, [])

    const [editMode, setEditMode] = useState(false)
    const [showButtons, setShowButtons] = useState(false)
    const [name, setName] = useState(props.note.name)
    const [body, setBody] = useState(props.note.body)
    const [error, setError] = useState(null)

    const { user } = useAuthContext()

    const clickHandler = () => {
        // props.handleNoteItemClick(!editMode)
        // setEditMode(!editMode)
    }

    const handleCancel = () => {
        setEditMode(false)
    }

    const handleMouseEnter = () => {
        setShowButtons(true)
    }

    const handleMouseLeave = () => {
        setShowButtons(false)
    }
    
    const handleEditNoteSubmit = async () => {

        const options = {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${user.token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, body, user: user._id})
        }

        const response = await fetch(
            process.env.NODE_ENV === 'development' || 'test' 
            ?`http://localhost:4000/api/projects/notes/${props.note._id}`
            :`https://todo-react-fullstack-production.up.railway.app/api/projects/notes/${props.note._id}`, 
            options)
        const json = await response.json()
        if(response.ok){
            console.log('great success, notee edited, heres the json: ', json)
            props.setNotesList(props.notesList.map(note => {
                return note._id === props.note._id ? json : note
            }))
            setEditMode(false)
        }
        if(!response.ok){
            console.log('something went wrong editing note. heres the json: ', json)
            setError(json.error)
        }
    }

    const handleEditModeOn = () => {
        setEditMode(true)
    }


    const handleDeleteNote = async () => {

        console.log("delete note")
        const options = {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${user.token}`,
                'Content-Type': 'application/json'
            }
        }
        const response = await fetch(
            process.env.NODE_ENV === 'development' || 'test' 
            ?`http://localhost:4000/api/projects/notes/${props.note._id}`
            :`https://todo-react-fullstack-production.up.railway.app/api/projects/notes/${props.note._id}`, 
            options)
        const json = await response.json()

        if(response.ok){
            console.log("note deleted! heres the json: ", json)
            props.setNotesList(props.notesList.filter(note => {
                return note._id !== props.note._id
            }))
        }
        if(!response.ok){
            console.log("somethin went wrong deleting the note. json: ", json)
            setError(json.error)
        }
    }

    return ( 
        <div className="note-item" onMouseEnter={() => handleMouseEnter()} onMouseLeave={() => handleMouseLeave()}>
            <div className="note-title-container">
                {!editMode &&
                    <h3>
                        {props.note.name}
                    </h3>
                }{editMode &&
                    <input defaultValue={props.note.name} onChange={e => setName(e.target.value)}>

                    </input>
                }
            </div>
            <div className="note-body-container">
                {!editMode &&
                    <p>
                        {props.note.body}
                    </p>
                }
                {editMode &&
                <input className="note-body-input" defaultValue={props.note.body} onChange={e => setBody(e.target.value)}>

                </input>
                }
            </div>
            {showButtons && !editMode &&
                <div className='note-item-buttons-container'>
                    <img src={EditNote} className="small-svg note-item-button" onClick={handleEditModeOn}></img>
                    <img src={Delete} className="small-svg note-item-button" onClick={handleDeleteNote}></img>
                </div>
            }
            {editMode &&
                <div className="note-item-buttons-container">
                    <img src={GreenCircleCheck} className="small-svg new-note-button" onClick={handleEditNoteSubmit}></img>
                    <img src={Cancel} className="small-svg new-note-button" onClick={handleCancel}></img>
                </div>
            }

        </div>
     );
}
 
export default NoteItem;