import { Route, Routes, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Login from './components/Login';
import Register from './components/Register';
import Courses from './components/Course';
import { Navbar } from './components/Navbar';
import './App.css';

const App = () => {
  let token = localStorage.getItem('token');
  let user = JSON.parse(localStorage.getItem('user'));


  return (
    <div className="App">
      <ToastContainer />
      <Navbar token={token} user={user} />
      <Routes>
        <Route path='/' element={<Login token={token} user={user} />} />
        <Route path='/register' element={<Register token={token} user={user} />} />
        <Route path='/courses' element={<Courses token={token} user={user} />} />
   
      </Routes>
    </div>
  );
}

export default App;
