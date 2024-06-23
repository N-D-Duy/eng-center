const Account = require('../../models/account');
const { checkValidEmail, checkValidPassword } = require('../../utils/auth_check');
const hashPassword = require('../../utils/hash_password');
const bcrypt = require('bcrypt');
const Admin = require('../../models/admin');
const Student = require('../../models/student');
const Teacher = require('../../models/teacher');
const Parent = require('../../models/parent');
/**
 * Logs in a user with the provided email/username and password.
 * @param {string} emailOrUsername - The email or username of the user.
 * @param {string} password - The password of the user.
 * @returns {Promise<string|object>} - A promise that resolves to either an error message or the user account object.
 */
const loginWithEmailOrUsernameAndPassword = async (req, res) => {
    const { emailOrUsername, password } = req.body;


    if (!emailOrUsername || !password) {
        return res.status(400).json({
            error: 'Email/Username and password are required'
        });
    }

    if (typeof emailOrUsername !== 'string') {
        return res.status(400).json({
            error: 'Email/Username must be a string'
        });
    }

    if (emailOrUsername.includes("@") && !checkValidEmail(emailOrUsername)) {
        return res.status(400).json({
            error: 'Invalid email'
        });
    }

    if (!checkValidPassword(password)) {
        return res.status(400).json({
            error: 'Invalid password'
        });
    }

    const bcrypt = require('bcrypt');

    try {
        // Tìm tài khoản dựa trên email hoặc username
        const account = await Account.findOne({
            $or: [
                { email: emailOrUsername },
                { user_name: emailOrUsername }
            ]
        });

        if (!account) {
            return res.status(400).json({
                error: 'Invalid email/username or password'
            });
        }


        // So sánh mật khẩu người dùng nhập vào với mật khẩu đã hash trong cơ sở dữ liệu
        const isMatch = await bcrypt.compare(password, account.password);

        if (!isMatch) {
            return res.status(400).json({
                error: 'Invalid email/username or password'
            });
        }

        switch (account.role) {
            case 'admin':
                const admin = await Admin.findOne({ account: account._id }).populate({
                    path: 'account',
                    select: 'role'
                });
                return res.status(200).json({
                    data: admin
                });
            case 'student':
                const student = await Student.findOne({ account: account._id }).populate({
                    path: 'account',
                    select: 'role'
                });
                return res.status(200).json({
                    data: student
                });
            case 'teacher':
                const teacher = await Teacher.findOne({ account: account._id }).populate({
                    path: 'account',
                    select: 'role'
                });
                return res.status(200).json({
                    data: teacher
                });
            case 'parent':
                const parent = await Parent.findOne({ account: account._id }).populate({
                    path: 'account',
                    select: 'role'
                });
                return res.status(200).json({
                    data: parent
                });
            default:
                return res.status(400).json({
                    error: 'unknown error'
                });
        }
    }catch (err) {
        return res.status(400).json({
            error: err.message
        });
    }
};

const changePassword = async (req, res) => {
    const { emailOrUsername, oldPassword, newPassword } = req.body;
    if (!emailOrUsername || !oldPassword || !newPassword) {
        return res.status(400).json({
            error: 'Email/Username and password are required'
        });
    }

    if (typeof emailOrUsername !== 'string') {
        return res.status(400).json({
            error: 'Email/Username must be a string'
        });
    }

    if (emailOrUsername.includes("@") && !checkValidEmail(emailOrUsername)) {
        return res.status(400).json({
            error: 'Invalid email'
        });
    }

    //check new password is valid
    if (!checkValidPassword(newPassword)) {
        return res.status(400).json({
            error: 'Invalid password'
        });
    }

    try {
        const account = await Account.findOne({
            $or: [
                { email: emailOrUsername },
                { user_name: emailOrUsername }
            ]
        });

        if (!account) {
            return res.status(400).json({
                error: 'Invalid email/username'
            });
        }

        //check old password
        const isMatch = await bcrypt.compare(oldPassword, account.password);

        if (!isMatch) {
            return res.status(400).json({
                error: 'Old password is incorrect'
            });
        }

        account.password = newPassword;
        await account.save();

        return res.status(200).json({
            data: account,
            message: 'Password changed successfully'
        });
    } catch (err) {
        return res.status(400).json({
            error: err.message
        });
    }
}



module.exports = { loginWithEmailAndPassword: loginWithEmailOrUsernameAndPassword, changePassword };