import {useEffect, useState} from "react"
import {getpatient, deletepatient} from "../services/ApiService"
import AddPatient from "../AddPatient"


const PatientList = () => {
    const [showAddPatient, setShowAddPatient] = useState(false)
    const [patients, setPatients] = useState([])
    const [editingPatient, setEditingPatient] = useState(null)

    useEffect(() => {
        getpatient().then(res => setPatients(res))
    }, [])

    const handleCancelBtn = () => {
        setShowAddPatient(false)
        setEditingPatient(null)
        getpatient().then(res => setPatients(res))
    }

    const handleDeleteBtn = (id) => {
        deletepatient(id).then(() => setPatients(patients.filter(p => p.patient_id !== id)))
    }

    const handleEditBtn = (id) => {
        const patient = patients.find(p => p.patient_id === id)
        setEditingPatient(patient)
        setShowAddPatient(true)
    }

    return (
        <div className="container">
            <h2>Patient List</h2>
            <table className="table table-striped">
                <thead className="thead-dark">
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">First Name</th>
                    <th scope="col">Last Name</th>
                    <th scope="col">Blood Group</th>
                    <th scope="col">Action</th>
                </tr>
                </thead>
                <tbody>
                {patients.map((patient) => (
                    <tr key={patient.patient_id}>
                        <td>{patient.patient_id}</td>
                        <td>{patient.first_name}</td>
                        <td>{patient.last_name}</td>
                        <td>{patient.blood}</td>
                        <td>
                            <button className="btn btn-primary m-2"
                                    onClick={() => handleEditBtn(patient.patient_id)}>Edit
                            </button>
                            <button className="btn btn-danger" 
                                    onClick={() => handleDeleteBtn(patient.patient_id)}>Delete
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <br/>
            <button className="btn btn-success" onClick={() => {
                setShowAddPatient(true);
                setEditingPatient(null)
            }}>Add Patient
            </button>
            <br/><br/>
            {showAddPatient && <AddPatient handleCancelBtn={handleCancelBtn} patient={editingPatient}/>}
        </div>
    )
}

export default PatientList;
