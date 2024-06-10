import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Login } from "./components/Login"
import { Navbar } from "./components/Navbar"
import { Register } from "./components/Register"
import './App.css';
import Courses from './components/Courses';
import { useDispatch } from 'react-redux';
import { getAllCourses } from './redux/actions/authActions';
import { useEffect } from 'react';
import CourseList from './components/CourseList';

function App() {

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllCourses())
  }, [dispatch]);
  return (
    <div className="App">
      <ToastContainer />
      <Navbar />
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/courses' element={<Courses />} />
        <Route path='/courseList' element={<CourseList />} />

      </Routes>
    </div>
  );
}

export default App;
