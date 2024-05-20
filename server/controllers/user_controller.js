const UserData = require('../datasource/user');

//for student role
const getStudentInfor = async (req, res) => UserData.StudentData.getStudentInfor(req, res);
const getAllStudents = async (req, res) => UserData.StudentData.getAllStudents(req, res);
const createStudent = async (req, res) => {
    //create account first, then create student
    //req includes account info and student info
    //get account info
    

    try{
        await UserData.createAccount(req, res);
        UserData.StudentData.createStudent(req, res);
        return res.status(200).send({
            message: "Student created successfully!"
        });
    } catch (error) {
        res.status(500).send({
            message: error.message || "Some error occurred while creating the student."
        });
    }
};

//for teacher role
const getTeacherInfor = async (req, res) => UserData.TeacherData.getTeacherInfor(req, res);
const getAllTeachers = async (req, res) => UserData.TeacherData.getAllTeachers(req, res);
const createTeacher = async (req, res) => UserData.TeacherData.createTeacher(req, res);

//for parent role
const getParentInfor = async (req, res) => UserData.ParentData.getParentInfor(req, res);
const getAllParents = async (req, res) => UserData.ParentData.getAllParents(req, res);
const createParent = async (req, res) => UserData.ParentData.createParent(req, res);

module.exports = {
    getStudentInfor,
    getAllStudents,
    createStudent,
    getTeacherInfor,
    getAllTeachers,
    createTeacher,
    getParentInfor,
    getAllParents,
    createParent
};