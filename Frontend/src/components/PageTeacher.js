import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from "react-toastify";
import { getAllCourses } from '../redux/actions/authActions';
export const PageTeacher = () => {
    const { courses, token } = useSelector((state) => state.auth);
    const [name, setName] = useState("")
    const [description, SetDescription] = useState("")
    const [start_date, SetStartDate] = useState("")
    const [end_date, setEndDate] = useState("")
    const [loading, setLoading] = useState("");
    const [editingUser, setEditingUser] = useState(null);
    const dispatch = useDispatch();
    const formatDateStart = () => {
        const date = new Date(editingUser && editingUser.start_date ? editingUser.start_date : null);
        return date.toISOString().split('T')[0];
    };
    const formatDateEnd = () => {
        const date = new Date(editingUser && editingUser.end_date ? editingUser.end_date : null);
        return date.toISOString().split('T')[0];
    };
    useEffect(() => {
        if (editingUser) {
            setName(editingUser.name)
            SetDescription(editingUser.description)
            SetStartDate(formatDateStart(editingUser.start_date))
            setEndDate(formatDateEnd(editingUser.end_date))
        } else {
            setName("")
            SetDescription("")
            SetStartDate("")
            setEndDate("")
        }
    }, [editingUser]);
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        if (editingUser) {
            axios.put(`/courses/${editingUser.id}`, { name, description, start_date, end_date })
                .then((res) => {
                    dispatch(getAllCourses())
                    setLoading(false)
                })
                .catch((error) => {
                    if (error.response) {
                        toast.error(error.response.data.message)
                        setLoading(false)
                    }
                });
        } else {
            axios.post('/courses', { name, description, start_date, end_date }).then((res) => {
                dispatch(getAllCourses())
                setName("")
                SetDescription("")
                SetStartDate("")
                setEndDate("")
                setLoading(false)
            })
                .catch((error) => {
                    if (error.response) {
                        toast.error(error.response.data.message)
                    }
                    setLoading(false)
                });
        }
    }
    const handleDelete = (id) => {
        axios.delete(`/courses/${id}`).then(() => {
            dispatch(getAllCourses())
        })
            .catch((error) => {
                if (error.response) {
                    toast.error(error.response.data.message)
                }
                setLoading(false)
            });
    }
    return (
        <>
            {token !== null ?
                <div className="container-lg mt-5">
                    <div className="row">
                        <div className="col-md-8 mb-2">
                            <div className='card p-3'>
                                <div className="table-responsive">
                                    <h3>List Courses</h3>
                                    <table className="table table-striped table-hover">
                                        <thead>
                                            <tr>
                                                <th>Name</th>
                                                <th>Description</th>
                                                <th>Start Date</th>
                                                <th>End Date</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {courses && courses.map((row) => {
                                                return <tr key={row.id} >
                                                    <td>{row.name}</td>
                                                    <td>{`${row && row.description}`.slice(0, 50)}..</td>
                                                    <td>{new Date(`${row.start_date}`).toLocaleDateString()}</td>
                                                    <td>{new Date(`${row.start_date}`).toLocaleDateString()}</td>
                                                    <td>
                                                        <button className="btn btn-warning btn-sm me-2" onClick={() => setEditingUser(row)} >Edit</button>
                                                        <button className="btn btn-danger btn-sm me-2" onClick={() => handleDelete(row.id)} >Delete</button>

                                                    </td>
                                                </tr>
                                            })}


                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card p-3 mb-3">
                                <h3 className="mb-4 fs">{editingUser ? 'Edit User' : 'Add User'}</h3>
                                <div className="form-group">
                                    <label className='pb-2 pt-2'>Name</label>
                                    <input type="text" className="form-control" placeholder='Enter Your Name' id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} />
                                </div>
                                <div className="form-group" >
                                    <label className='pb-2 pt-2'>Description</label>
                                    <textarea type="text" className="form-control" placeholder='Enter Your Description' id="description" name="description" value={description} onChange={(e) => SetDescription(e.target.value)} />
                                </div>
                                <div className="form-group">
                                    <label className='pb-2 pt-2'>Start Date</label>
                                    <input type="date" className="form-control" id="start_date" name="start_date" value={start_date} onChange={(e) => SetStartDate(e.target.value)} />
                                </div>
                                <div className="form-group">
                                    <label className='pb-2 pt-2'>End Date</label>
                                    <input type="date" className="form-control" id="end_date" name="end_date" max={end_date} min={end_date} value={end_date} onChange={(e) => setEndDate(e.target.value)} />
                                </div>
                                <button type="submit" className="btn btn-primary mt-3" onClick={handleSubmit} >
                                    {loading ? (
                                        <div className="spinner-border spinner-border-sm text-light" role="status">

                                        </div>
                                    ) : (
                                        editingUser ? (
                                            <><i className="bi bi-pencil-fill"></i> Update</>
                                        ) : (
                                            <><i className="bi bi-plus-circle-fill"></i> Create</>
                                        )
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div> : <div class="col-md-12 text-center mt-4">
                    <h1>404</h1>
                    <h2>Page Not Found</h2>
                    <p>
                        Sorry, the page you are looking
                        for does not exist.
                    </p>
                </div>}
        </>
    );
}
