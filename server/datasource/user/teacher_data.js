const Teacher = require('../../../models/teacher');

const getTeacherInfor = async (req, res) => {
    try {
        const teacher = await Teacher.findById(req.params.id);
        return res.status(200).json({
            data: teacher
        });
    }
    catch (err) {
        return res.status(400).json({
            error: err.message
        });
    }
}

const getAllTeachers = async (req, res) => {
    try {
        const teachers = await Teacher.find();
        return res.status(200).json({
            data: teachers
        });
    }
    catch (err) {
        return res.status(400).json({
            error: err.message
        });
    }
};

const createTeacher = async (req, res) => {
    try {
        const teacher = await Teacher.create(req.body);
        return res.status(201).json({
          data: teacher
        });
      } catch (err) {
        return res.status(400).json({
          error: err.message
        });
      }
};

module.exports = {
    getTeacherInfor,
    getAllTeachers,
    createTeacher
};