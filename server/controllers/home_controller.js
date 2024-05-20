const CourseData = require('../datasource/course/course_data');
const UserData = require('../datasource/user');

module.exports = {
    //student role
    getFullCourse : async (req, res) => CourseData.getAllCourses(req, res),
    getCourseById : async (req, res) => CourseData.getCourseById(req, res),
    findCourse : async (req, res) => CourseData.findCourse(req, res),
    getAllStudentsInCourse : async (req, res) => CourseData.getAllStudentsInCourse(req, res),
    
    //for admin role
    updateCourse : async (req, res) => CourseData.updateCourse(req, res),
    deleteCourse : async (req, res) => CourseData.deleteCourse(req, res),
    createCourse : async (req, res) => CourseData.createCourse(req, res),
    getAllTeachers: async(req, res) => UserData.TeacherData.getAllTeachers(req, res),
};