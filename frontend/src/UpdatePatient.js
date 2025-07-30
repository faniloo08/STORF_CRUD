import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
//bibliothèque reliant SQL-react qui nécessite la crétion d'API dans le server
import axios from 'axios';
import { Link } from 'react-router-dom'

function UpdateStudent() {
    const [name, setName] = useState("");
    //un tableau de la chaine "name" qui est initialement vide ="" ;et de la fonction setName qui se sert de la "state" pour m-a-j la variable 
    const [numDossier, setnumDossier] = useState("");
    const [diagnostic, setDiagnostic] = useState("");
    const [medecin, setMedecin] = useState("");
    const [prochainRdv, setProchainrdv] = useState("");
    const {id} = useParams();
    // Cela signifie que si l'URL contient un paramètre nommé "id", la variable id contiendra sa valeur
    const navigate = useNavigate();

    function handleSubmit(event){
        event.preventDefault();
        axios.put('http://localhost:8081/update/'+id, {name, numDossier, diagnostic, medecin, prochainRdv})
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
                        <input type="text" id="numDossier" placeholder="Enter folder num" className="form-control" 
                        onChange = {e => setnumDossier(e.target.value)}/>
                    </div>
                    <div className='mb-2'>
                        <label htmlFor="">Diagnostic</label>
                        <input type="text" id="diagnostic" placeholder="Enter Diagnosis" className="form-control" 
                        onChange = {e => setDiagnostic(e.target.value)}/>
                    </div>
                    <div className='mb-2'>
                        <label htmlFor="">Prochain Rendez-vous</label>
                        <input type="text" id="prochainRdv" placeholder="Enter next appointement(YYYY-MM-DD)" className="form-control" 
                        onChange = {e => setProchainrdv(e.target.value)}/>
                    </div>
                    <div className='mb-2'>
                        <label htmlFor="">Médecin</label>
                        <input type="text" id="medecin" placeholder="Enter Doctor Name" className="form-control" 
                        onChange = {e => setMedecin(e.target.value)}/>
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