const ParentData = require('./parent_data');
const StudentData = require('./student_data');
const TeacherData = require('./teacher_data');
const Account = require('../../../models/account');

const createAccount = async (req, res) => {
    try {
        await bcrypt.hash(req.body.password, 10);
        const account = await Account.create(req.body);
        console.log(account);
        return res.status(201).json({
            data: account
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
    createAccount,
};