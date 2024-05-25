const Student = require('../../../models/student.js');
const CourseStudent = require('../../../models/course_student.js');
const Account = require('../../../models/account.js');
const mongoose = require('mongoose');

const getStudentInfor = async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);
        return res.status(200).json({
            data: student
        });
    }
    catch (err) {
        return res.status(400).json({
            error: err.message
        });
    }
};

const getAllStudents = async (req, res) => {
    try {
        const students = await Student.find();
        return res.status(200).json({
            data: students
        });
    }
    catch (err) {
        return res.status(400).json({
            error: err.message
        });
    }
};

const createStudent = async (req, res) => {
    try {
        // Tạo một tài khoản mới
        const account = new Account(req.body.account);
        await account.save();
        
        // Lấy account id
        const account_id = account._id;
        
        // Gán account id cho đối tượng student
        req.body.student.account = account_id;
        
        // Kiểm tra xem parent có được cung cấp hay không
        if(req.body.student.parent == "") {
            req.body.student.parent = null;
        }
        
        // Chuyển parent id từ string sang ObjectId
        req.body.student.parent = new mongoose.Types.ObjectId.createFromHexString(req.body.student.parent);
        
        // Tạo student mới
        const student = await Student.create(req.body.student);
        return res.status(201).json({
            data: student
        });
    } catch (err) {
        return res.status(400).json({
            error: err.message
        });
    }
};


const getAllCoursesJoined = async (req, res) => {
    try {
        //ref course_student schema, using student id to get all courses that student joined
        const courses = await CourseStudent.find({ student_id: req.params.id });
        return res.status(200).json({
            data: courses
        });
    }
    catch (err) {
        return res.status(400).json({
            error: err.message
        });
    }
}

module.exports = {
    getStudentInfor,
    getAllStudents,
    createStudent,
    getAllCoursesJoined
};

