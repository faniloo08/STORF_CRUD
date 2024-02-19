
import 'bootstrap/dist/css/bootstrap.min.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Student from './Student';
import CreateStudent from './CreateStudent';
import UpdateStudent from './UpdateStudent';
import SearchStudent from './SearchStudent';

//This is where the "routings"(routages) are made
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path ='/' element={<Student />}></Route>
          <Route path ='/create' element={<CreateStudent />}></Route>
          <Route path ='/update/:id' element={<UpdateStudent />}></Route>
          <Route path ='/search' element={<SearchStudent />}></Route>
          <Route path ='/total' element={<Student />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
