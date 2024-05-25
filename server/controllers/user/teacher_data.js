const Teacher = require('../../../models/teacher');
const Account = require('../../../models/account');
const mongoose = require('mongoose');

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
        //create a new account first
        const account = new Account(req.body.account);
        await account.save();
        //then get the account id
        const account_id = account._id;
        //add the account id to the teacher object
        req.body.teacher.account = account_id;
        const teacher = await Teacher.create(req.body.teacher);
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