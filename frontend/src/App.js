
import 'bootstrap/dist/css/bootstrap.min.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Patient from './Patient';
import CreatePatient from './CreatePatient';
import UpdatePatient from './UpdatePatient';
import SearchPatient from './SearchPatient';
import Connexion from './Connexion';

//This is where the "routings"(routages) are made
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path ='/' element={<Patient />}></Route>
          <Route path ='/create' element={<CreatePatient />}></Route>
          <Route path ='/update/:id' element={<UpdatePatient />}></Route>
          <Route path ='/search' element={<SearchPatient />}></Route>
          <Route path ='/total' element={<Patient />}></Route>
          <Route path ='/login' element={<Connexion />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
