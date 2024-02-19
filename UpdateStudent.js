import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
//bibliothèque reliant SQL-react qui nécessite la crétion d'API dans le server
import axios from 'axios';
import { Link } from 'react-router-dom'

function UpdateStudent() {
    const [name, setName] = useState("");
    //un tableau de la chaine "name" qui est initialement vide ="" ;et de la fonction setName qui se sert de la "state" pour m-a-j la variable 
    const [email, setEmail] = useState("");
    const {id} = useParams();
    // Cela signifie que si l'URL contient un paramètre nommé "id", la variable id contiendra sa valeur
    const navigate = useNavigate();

    function handleSubmit(event){
        event.preventDefault();
        axios.put('http://localhost:8081/update/'+id, {name, email})
        .then(res => {
            console.log(res);
            navigate('/');
        }).catch(err => console.log(err));
    }
    return(
        <div className = 'd-flex vh-100 bg-primary justify-content-center align-items-center'>
            <div className='w-50 bg-white rounded p-3'>
                <form onSubmit={handleSubmit}>
                    <h2>Mis-à-jour</h2>
                    <div className='mb-2'>
                        <label htmlFor="">Nom</label>
                        <input type="text" id="name" placeholder="Enter Name" className="form-control" 
                        onChange = {e => setName(e.target.value)}/>
                    </div>
                    <div className='mb-2'>
                        <label htmlFor="">Numero de dossier</label>
                        <input type="text" id="email" placeholder="Enter folder num" className="form-control" 
                        onChange = {e => setEmail(e.target.value)}/>
                    </div>
                <button className="btn btn-success">Update</button>
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

export default UpdateStudent