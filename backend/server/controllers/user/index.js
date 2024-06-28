const ParentData = require('./parent_data');
const StudentData = require('./student_data');
const TeacherData = require('./teacher_data');
const Account = require('../../models/account');
const AdminData = require('./admin_data');
const { checkValidEmail } = require('../../utils/auth_check');


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

const updateAccount = async (req, res) => {
    const accountId = req.params.id;
    const updatedFields = req.body;

    try {
        // check account exists
        const account = await Account.findById(accountId);
        if (!account) {
            return res.status(404).json({ message: 'Account not found' });
        }

        // check email is valid
        if(checkValidEmail(updatedFields.email) === false) {
            return res.status(400).json({
                error: 'Invalid email'
            });
        }
        // check email is already used
        const emailExist = await Account.findOne({ email: updatedFields.email });
        if (emailExist && emailExist._id.toString() !== accountId) {
            return res.status(400).json({
                error: 'Email already exists'
            });
        }

        // update account based on updatedFields
        Object.keys(updatedFields).forEach(field => {
            if (field === 'full_name' || field === 'email' || field === 'phone' || field === 'status') {
                account[field] = updatedFields[field];
            }
        });

        // save updated account
        await account.save();

        return res.status(200).json({
            message: 'Account updated successfully',
            updatedAccount: account
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

module.exports = {
    ParentData,
    StudentData,
    TeacherData,
    getAccounts,
    AdminData,
    updateAccount
};