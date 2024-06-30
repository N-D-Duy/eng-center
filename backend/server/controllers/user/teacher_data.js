const Teacher = require('../../models/teacher');
const Account = require('../../models/account');
const mongoose = require('mongoose');
const hashPassword = require('../../utils/hash_password');
const { checkValidPassword } = require('../../utils/auth_check');

const getTeacherInfor = async (req, res) => {
    try {
        const teacher = await Teacher.findById(req.params.id).populate('account').exec();
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
        const teachers = await Teacher.find().populate('account').exec();
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
        const accountData = req.body.account;
        if(checkValidPassword(accountData.password) === false) {
            return res.status(400).json({
                error: 'Password is too weak (>8, contains number, special character)'
            });
        }
        //hash password before save to database
        accountData.password = await hashPassword(accountData.password);
        //create a new account first
        const account = new Account(req.body.account);
        if (account.role !== "teacher") {
            return res.status(400).json({
                error: 'Invalid role'
            });
        }

        //check email and username is already used
        const emailExist = await Account.findOne({ email: account.email });
        const usernameExist = await Account.findOne({ user_name: account.user_name });
        if (emailExist) {
            return res.status(400).json({
                error: 'Email already exists'
            });
        }
        if (usernameExist) {
            return res.status(400).json({
                error: 'Username already exists'
            });
        }
        
        await account.save();
        //then get the account id
        const account_id = account._id;
        //add the account id to the teacher object
        req.body.teacher.account = account_id;
        const teacher = await Teacher.create(req.body.teacher);
        return res.status(201).json({
            data: teacher,
            message: 'Teacher created successfully'
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