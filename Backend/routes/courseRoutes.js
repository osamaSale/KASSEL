const express = require('express');
const router = express.Router();
const { getCourses, addCourse , getCourse , editCourse , removeCourse} = require('../controllers/courseController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/',authMiddleware ,  getCourses);
router.post('/', addCourse);
router.get('/:id', getCourse);
router.put('/:id',  editCourse);
router.delete('/:id', removeCourse);
module.exports = router;