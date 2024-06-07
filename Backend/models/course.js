const connection = require('../config/database');


module.exports = {
    createCourse: async (name, description, startDate, endDate) => {
        const [result] = await connection.query(
            'INSERT INTO courses (name, description, start_date, end_date) VALUES (?, ?, ?, ?)',
            [name, description, startDate, endDate]
        );
        return result;
    },
   
    getAllCourses: async ()=> {
        const [rows] = await connection.query('SELECT * FROM courses');
        return rows;
    },

    getCourseById: async (id) => {
        const [rows] = await connection.query('SELECT * FROM courses WHERE id = ?', [id]);
        return rows[0];
    },

    updateCourse: async (id, name, description, startDate, endDate) => {
        const [result] = await connection.query(
            'UPDATE courses SET name = ?, description = ?, start_date = ?, end_date = ? WHERE id = ?',
            [name, description, startDate, endDate, id]
        );
        return result;
    },

    deleteCourse: async (id) => {
        const [result] = await connection.query('DELETE FROM courses WHERE id = ?', [id]);
        return result;
    }

}