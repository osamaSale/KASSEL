import React from 'react';
import { useSelector } from 'react-redux';
import { PageStudent } from "./PageStudent"
import { PageTeacher } from './PageTeacher';
const Courses = () => {
    const { user } = useSelector((state) => state.auth);
    return (
        <div>
            {
                user && user.role === "student" ? <PageStudent /> : <PageTeacher />
            }
        </div>
    );
}

export default Courses;
