import React, {useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'


function SearchStudent() {
    const [name, setName] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [showResults, setShowResults] = useState(false);
        //Ce qui se passe après l'envoie du formulaire,c-a-d l'API SQL-react
        const handleSearch = (event) => {
            event.preventDefault();
            axios.get('http://localhost:8081/search', {
              params: {
                name: name
              }
            })
            .then(res => {
                setSearchResults(res.data);
                setShowResults(true);
                console.log(res);
              // Faire quelque chose avec les résultats, par exemple, mettre à jour le state
            })
            .catch(err => console.log(err));
          }
          function naffiche(){
            //setShowResults(false);

          }
    
        return(
            <div className = 'd-flex vh-100 bg-primary justify-content-center align-items-center'>
                <div className='w-50 bg-white rounded p-3'>
                    <form onSubmit={handleSearch}>
                        <h2>Rechercher un patient</h2>
                        <div className='mb-2'>
                            <label htmlFor="">Name</label>
                            <input type="text" placeholder="Enter Name to search" className="form-control" 
                            onChange = {e => setName(e.target.value)}/>
                        </div>
                        <button className="btn btn-success">Search</button>
                        <div className="text-center mt-4">
                            <Link to='/' className='btn btn-primary'>
                                Retour à la page d'accueil
                            </Link>
                        </div>
    
                    </form>
                    {showResults && (
                        <div className='justify-content-center align-items-center'>
                            <div className = 'w-50 bg-white rounded p-3'>
                                {/* <button className="btn btn-danger" onClick={naffiche()}>X</button> */}
                                <h2>Résultats de la recherche :</h2>
                                {searchResults.map(res => (
                                    <div key={res.id}>
                                    <p>Nom : {res.Name}</p>
                                    <p>Num de dossier : {res.email}</p>
                                   
                                    {/* Ajouter d'autres informations en fonction de la structure de ta table */}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
    )
}

export default SearchStudent