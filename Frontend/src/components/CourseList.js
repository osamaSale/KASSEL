// src/components/CourseList.js
import React, { useState, useEffect } from 'react';
import { Table, Button, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import courseService from '../services/courseService';
import authService from '../services/authService';

const CourseList = () => {
    const [courses, setCourses] = useState([]);
    const currentUser = authService.getCurrentUser();

    useEffect(() => {
        courseService.getCourses().then(response => {
            setCourses(response.data);
        });
    }, []);

    return (
        <Container>
            <h2>Courses</h2>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        {currentUser.role === 'teacher' && <th>Actions</th>}
                    </tr>
                </thead>
                <tbody>
                    {courses.map(course => (
                        <tr key={course.id}>
                            <td>{course.name}</td>
                            <td>{course.description}</td>
                            <td>{course.start_date}</td>
                            <td>{course.end_date}</td>
                            {currentUser.role === 'teacher' && (
                                <td>
                                    <Button as={Link} to={`/course/edit/${course.id}`} variant="warning" size="sm">
                                        Edit
                                    </Button>
                                </td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
};

export default CourseList;
