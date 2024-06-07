const { createCourse, getAllCourses, getCourseById, updateCourse, deleteCourse } = require('../models/course');
module.exports = {
    getCourses: async (req, res) => {
        const courses = await getAllCourses();
        res.json(courses);
    },
    addCourse: async (req, res) => {
        const { name, description, start_date, end_date } = req.body;
        const teacherId = req.userId;
        await createCourse(name, description, start_date, end_date, teacherId);
        res.status(201).json({ message: 'Course created' });
    },
    getCourse: async (req, res) => {
        const { id } = req.params;
        const course = await getCourseById(id);
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }
        res.json(course);
    },
     editCourse : async (req, res) => {
        const { id } = req.params;
        const { name, description, start_date, end_date } = req.body;
        await updateCourse(id, name, description, start_date, end_date);
        res.status(200).json({ message: 'Course updated' });
      },
      
       removeCourse : async (req, res) => {
        const { id } = req.params;
        await deleteCourse(id);
        res.status(200).json({ message: 'Course deleted' });
      }

}