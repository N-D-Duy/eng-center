const Student = require('../../models/student.js');
const CourseStudent = require('../../models/course_student.js');
const Account = require('../../models/account.js');
const mongoose = require('mongoose');
const { checkValidPassword } = require('../../utils/auth_check.js');
const hashPassword = require('../../utils/hash_password.js');

const getStudentInfor = async (req, res) => {
    try {
        const student = await Student.findById(req.params.id).populate('account').exec();
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
        const students = await Student.find().populate('account').exec();
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
        const account = req.body.account;
        //check if password is valid
        if(checkValidPassword(account.password) === false) {
            return res.status(400).json({
                error: 'Password is too weak (>8, contains number, special character)'
            });
        }


        if (account.role !== "student") {
            return res.status(400).json({
                error: 'Invalid role'
            });
        }

        //check if email or username is already used
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

        //hash password before save to database
        account.password = await hashPassword(account.password);
        //create new account
        const accountSchema = new Account(account);

        await accountSchema.save();

        //get account id
        const account_id = accountSchema._id;

        //assign account id to student
        req.body.student.account = account_id;

        // convert parent id sang object id nếu parent id rỗng
        if (req.body.student.parent == "") {
            req.body.student.parent = null;
        } else {
            // convert parent id sang object id
            req.body.student.parent = new mongoose.Types.ObjectId.createFromHexString(req.body.student.parent);
        }



        //create new student
        const student = await Student.create(req.body.student);
        return res.status(201).json({
            data: student,
            message: 'Student created successfully'
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
        const courses = await CourseStudent.find({ student: req.params.id });
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

