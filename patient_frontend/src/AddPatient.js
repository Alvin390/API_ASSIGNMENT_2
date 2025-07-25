import axios from "axios"
import {useState, useEffect} from "react"

const AddPatient = ({handleCancelBtn, patient}) => {
    const [first_name, setfirst_name] = useState("")
    const [last_name, setlast_name] = useState("")
    const [blood, setBlood] = useState("")

    useEffect(() => {
        if (patient) {
            setfirst_name(patient.first_name)
            setlast_name(patient.last_name)
            setBlood(patient.blood)
        } else {
            setfirst_name("")
            setlast_name("")
            setBlood("")
        }
    }, [patient])

    const handleSubmit = async e => {
        e.preventDefault()
        if (patient) {
            // Edit mode: PUT request
            await axios.put(`http://127.0.0.1:8000/patients/${patient.patient_id}/`, {first_name, last_name, blood})
        } else {
            // Add mode: POST request
            await axios.post("http://127.0.0.1:8000/patients/", {first_name, last_name, blood})
        }
        setfirst_name("")
        setlast_name("")
        setBlood("")
        handleCancelBtn()
    }

    return (
        <div className="container">
            <h2>{patient ? "Edit Patient" : "Add Patient"}</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>First Name</label>
                    <input type="text" className="form-control" value={first_name}
                           onChange={e => setfirst_name(e.target.value)} required/>
                </div>
                <div className="form-group">
                    <label>Last Name</label>
                    <input type="text" className="form-control" value={last_name}
                           onChange={e => setlast_name(e.target.value)} required/>
                </div>
                <div className="form-group">
                    <label>Blood Group</label>
                    <input type="text" className="form-control" value={blood}
                           onChange={e => setBlood(e.target.value)} required/>
                </div>
                <button type="submit" className="btn btn-success">
                    {patient ? "Update Patient" : "Add Patient"}
                </button>
                <button type="button" className="btn btn-secondary ml-2" onClick={handleCancelBtn}>Cancel</button>
            </form>
        </div>
    )
}
export default AddPatient;
