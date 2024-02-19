//This is the "home page"
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Logo from './image/logo.png'
import avatar from './image/avatar.jpg'
import Bell from './image/bell.png'

function Student() {

    const [student, setStudent] = useState([])
    // shows all the data in the DB ("select * from student")
    useEffect(() =>{
        axios.get('http://localhost:8081/')
        .then(res => setStudent(res.data))
        .catch(err => console.log(err));
    },[])

    const handleDelete = async (id) => {
        try{
            await axios.delete('http://localhost:8081/student/' +id)
            window.location.reload()
        }catch(err){
            console.log(err);
        }

    }

    //shows total number of data
    const [totalRows, setTotalRows] = useState(null);

    useEffect(() =>{
        axios.get('http://localhost:8081/total_rows')
        .then(res =>{
            setTotalRows(res.data.total)
        })
        .catch(err =>{
            console.log(err)
        });
    },[]);


    return(
        //handleBG
        <div className='d-flex vh-100 justify-content-center align-items-center'> 
        {/* header */}
            <div className='d-flex justify-content-between mb-2 align-items-center'>
                <img src={Logo} 
                style={{
                    width : '150px',
                    height : 'auto',
                    position :'absolute',
                    top: '20px',
                    left: '20px'
                }}/>
                <h4 
                style={{
                    position :'absolute',
                    top: '35px',
                    left :'200px'
                    
                }}>
                    Service de Traumatologie, Orthopédie et Rééducation Fonctionnelle
                </h4> 
                <div >
                    <img src={avatar} title='Lova'
                    style={{
                        width : '50px',
                        height : '50px',
                        borderRadius : '50px',
                        position :'absolute',
                        top: '20px',
                        right: '20px'
                    }}/>
                </div>
                <div >
                    <img src={Bell}  title='Notifictions'
                    style={{
                        width : '30px',
                        height : '30px',
                        borderRadius : '50px',
                        position :'absolute',
                        top: '25px',
                        right: '120px'
                    }}/>
                </div>
            </div> 
            <div>
                <h3
                style={{
                    position :'absolute',
                    top: '130px',
                    //left :'650px'
                    textAlign: 'center',
                    
                }}>
                    Patients récemment ajoutés :
                </h3>  
            </div>
            {/* handleForm */}
            <div className='w-30 bg-light rounded p-3'>
                {/* handle Search and Add button */}
                <div className='d-flex justify-content-between mb-4'>
                    <Link to="/create" className='btn btn-success'> Add+ </Link>
                    <Link to='/search' className='btn btn-info'> Search </Link>
                </div>
                {/* all the data here */}
                <table className='table'>
                    <thead>
                        {/* table columns name */}
                        <tr>
                            <th>Nom</th>
                            <th>Numero de dossier</th>
                            {/* <th>Action</th> */}
                        </tr>
                    </thead>
                    {/* DB content */}
                    <tbody>
                        {/* as long as there's an element in the student table(which is considered as an array),the "i" increments and the data that correspond with this i is selected.  */}
                        {student.map((data, i) => (
                            <tr key={i}>
                                <td>{data.Name}</td>
                                <td>{data.email}</td>
                                <td>
                                    <Link to={`update/${data.ID}`} className='btn btn-primary'>Update</Link>
                                    <button className='btn btn-danger ms-2' onClick={e => handleDelete(data.ID)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                    
                    {/* total patient */}
                    <div>
                        {totalRows != null ? (
                            <h6
                             style={{
                                 position :'absolute',
                                 bottom: '130px',
                                 //left :'650px'
                                 textAlign: 'center',
                                 
                             }}>
                                Nombre de patients enregistrés : {totalRows}
                             </h6>  

                        ) : (
                            <h6
                             style={{
                                 position :'absolute',
                                 bottom: '130px',
                                 //left :'650px'
                                 textAlign: 'center',
                                 
                            }}>
                                Chargement...
                            </h6>  
                        )}
                       
                    </div>
                </table>
            </div>
        </div>


    )
}  

export default Student;