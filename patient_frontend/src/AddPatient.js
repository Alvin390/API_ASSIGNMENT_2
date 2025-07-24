import axios from "axios"
import {useState} from "react"

const AddPatient = ({handleCancelBtn}) => {
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [bloodGroup, setBloodGroup] = useState("")

    const handleSubmit = async e => {
        e.preventDefault()
        console.log(firstName, lastName, bloodGroup)
        const res = await axios.post("http://127.0.0.1:8000/patients/", {firstName, lastName, bloodGroup})
        console.log(res.data)
        setFirstName("")
        setLastName("")
        setBloodGroup("")
    }
    return (
        <>
            <div className="container">
                <h2>Add Patient</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>First Name</label>
                        <input type="text" className="form-control" value={firstName}
                               onChange={e => setFirstName(e.target.value)} required/>
                    </div>
                    <div className="form-group">
                        <label>Last Name</label>
                        <input type="text" className="form-control" value={lastName}
                               onChange={e => setLastName(e.target.value)} required/>
                    </div>
                    <div className="form-group">
                        <label>Blood Group</label>
                        <input type="text" className="form-control" value={bloodGroup}
                               onChange={e => setBloodGroup(e.target.value)} required/>
                    </div>
                    <button type="submit" className="btn btn-success">Add Patient</button>
                    <button type="button" className="btn btn-secondary ml-2" onClick={handleCancelBtn}>Cancel</button>
                </form>
            </div>
        </>
    )
}
export default AddPatient;
