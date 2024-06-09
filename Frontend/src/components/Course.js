import React, { useEffect, useState } from 'react';
import PageStudent from './PageStudent';
import Pageteacher from './PageTeacher';
import { toast } from "react-toastify";
import axios from 'axios';
const Course = ({ user, token }) => {
    const [courses, setcourses] = useState([])
    useEffect(() => {
        getAllCourse()
    }, [user, token])
    const getAllCourse = (e) => {
        axios.get('/courses', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then((res) => {
            setcourses(res.data)
        })
            .catch((error) => {
                if (error.response) {
                    toast.error(error.response.data.message)
                }
            });
    }


    return (
        <div>
            {user && user.role === 'student' ?
                <PageStudent courses={courses} getAllCourse={getAllCourse} user={user} token={user} /> :
                <Pageteacher courses={courses} getAllCourse={getAllCourse} user={user} token={user} />
            }

        </div>
    );
}

export default Course;
