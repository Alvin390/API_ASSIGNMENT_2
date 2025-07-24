import {useEffect, useState} from "react"
import {getpatient} from "../services/ApiService"
import AddPatient from "../AddPatient";

const PatientList = () => {
    const [showAddPatient, setShowAddPatient] = useState(false)
    const [patients, setPatients] = useState([])
    useEffect(() => {
        let mount = true
        getpatient()
            .then(res => {
                console.log("Response from API:", res)
                setPatients(res)
                return () => mount = false
            })
    }, [])

    const handleCancelBtn = () => {
        setShowAddPatient(false)
        getpatient()
            .then(res => {
                console.log("Response from API:", res)
                setPatients(res)
            })
    }

    return (
        <div className="container">
            <h2>Patient List</h2>
            <table className="table table-striped">
                <thead className="thead-dark">
                <tr>
                    <th scope="col">First Name</th>
                    <th scope="col">Last Name</th>
                    <th scope="col">Blood Group</th>
                    <th scope="col">Action</th>
                </tr>
                </thead>
                <tbody>
                {patients.map((patient, index) => (
                    <tr key={index}>
                        <td>{patient.first_name}</td>
                        <td>{patient.last_name}</td>
                        <td>{patient.blood_group}</td>
                        <td>
                            <button className="btn btn-primary">Edit</button>
                            <button className="btn btn-primary" onClick={()=> handleDeleteBtn(patient.patient_id)} </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <br/>
            <button className="btn btn-success" onClick={() => setShowAddPatient(true)}>Add Patient</button>
            <br/>
            <br/>
            {showAddPatient && <AddPatient handleCancelBtn={handleCancelBtn}/>}
        </div>


    )
}
export default PatientList;
