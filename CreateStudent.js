import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
//import { Button } from "react-bootstrap";
import axios from 'axios';
import { Link } from 'react-router-dom'

function CreateStudent() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const navigate = useNavigate();
    // const [student, setStudent] = useState([])

    // //fonction de retour en homepage
    // const handleButtonClick = () => {
       
    //     axios.get('http://localhost:8081/')
    //     .then(res => setStudent(res.data))
    //     .catch(err => console.log(err));
    
    // }

    //Ce qui se passe après l'envoie du formulaire,c-a-d l'API SQL-react
    function handleSubmit(event){
        event.preventDefault();
        axios.post('http://localhost:8081/create',{name,email})
        .then(res => {
            console.log('Request URL:', 'http://localhost:8081/create');
            console.log(res);
            navigate('/');
        }).catch(err => console.log(err));
    }

    return(
        <div className = 'd-flex vh-100 bg-primary justify-content-center align-items-center'>
            <div className='w-50 bg-white rounded p-3'>
                <form onSubmit={handleSubmit}>
                    <h2>Ajout d'un patient</h2>
                    <div className='mb-2'>
                        <label htmlFor="">Nom</label>
                        <input type="text" placeholder="Enter Name" className="form-control" 
                        onChange = {e => setName(e.target.value)}/>
                    </div>
                    <div className='mb-2'>
                        <label htmlFor="">Numero de dossier</label>
                        <input type="text" placeholder="Enter folder num" className="form-control" 
                        onChange = {e => setEmail(e.target.value)}/>
                    </div>
                    <button className="btn btn-success">Submit</button>
                    <div className="text-center mt-4">
                        <Link to='/' className='btn btn-primary'>
                            Retour à la page d'accueil
                        </Link>
                    </div>

                </form>

            </div>
        </div>
    )
}

export default CreateStudent