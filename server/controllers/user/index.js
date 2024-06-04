const ParentData = require('./parent_data');
const StudentData = require('./student_data');
const TeacherData = require('./teacher_data');
const Account = require('../../../models/account');


const getAccounts = async (req, res) => {
    try {
        const accounts = await Account.find();
        return res.status(200).json({
            data: accounts
        });
    } catch (error) {
        return res.status(400).json({
            error: error.message
        });
    }
};

module.exports = {
    ParentData,
    StudentData,
    TeacherData,
    getAccounts
};