const Student = require('../../../models/student.js');

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
        const student = await Student.create(req.body);
        return res.status(201).json({
          data: student
        });
      } catch (err) {
        return res.status(400).json({
          error: err.message
        });
      }
};

module.exports = {
    getStudentInfor,
    getAllStudents,
    createStudent
};

