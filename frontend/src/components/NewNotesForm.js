import { useState, useEffect} from 'react'
import GreenCircleCheck from '../img/green-circle-check.svg'
import Cancel from '../img/cancel.svg'
import useAuthContext from '../hooks/useAuthContext'
import useProjectContext from '../hooks/useProjectContext'

const NewNotesForm = (props) => {

    const [name, setName] = useState('')
    const [body, setBody] = useState('')
    const [error, setError] = useState(null)

    const { user } = useAuthContext()
    const { dispatch, globalProjectContext } = useProjectContext()

    const handleSave = async () => {
        const options = {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${user.token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, body, user: user._id})
        }
        const response = await fetch(
            process.env.NODE_ENV === 'development' || 'test'
            ? `http://localhost:4000/api/projects/notes`
            : `https://todo-react-fullstack-production.up.railway.app/api/projects/notes`, options) 

        const json = await response.json()

        if(response.ok){
            console.log("note saved! heres the json: ", json)
            props.handleDisplay()
            props.setNotesList([...props.notesList, json])
        }
        if(!response.ok){
            console.log("problem saving note: ", json)
            setError(json.error)
        }
    }

    const handleCancel = async () => {
        console.log("cancel")
        props.handleDisplay()
    }
    return ( 
        <div className="new-notes-form note-item">
            
            <div className="note-title-container">
                <input placeholder="Name your note" value={name} onChange={(e) => {setName(e.target.value)}}></input>
            </div>
            <div className="note-body-container">
                <input placeholder="Note body" value={body} onChange={(e) => {setBody(e.target.value)}}></input>
            </div>
            <div className='new-notes-form-button-container'>
                <img src={GreenCircleCheck} className="small-svg new-note-button" onClick={handleSave}></img>
                <img src={Cancel} className="small-svg new-note-button" onClick={handleCancel}></img>
            </div>
        </div>
     );
}
 
export default NewNotesForm;