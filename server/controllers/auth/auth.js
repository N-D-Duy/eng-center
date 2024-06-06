const Account = require('../../../models/account');
const { checkValidEmail, checkValidPassword } = require('../../utils/auth_check');

/**
 * Logs in a user with the provided email/username and password.
 * @param {string} emailOrUsername - The email or username of the user.
 * @param {string} password - The password of the user.
 * @returns {Promise<string|object>} - A promise that resolves to either an error message or the user account object.
 */
const loginWithEmailOrUsernameAndPassword = async (req, res) => {
    const {emailOrUsername, password} = req.body;
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

    try {
        const account = await Account.findOne({
            $or: [
                { email: emailOrUsername },
                { user_name: emailOrUsername }
            ],
            password: password
        });

        if (!account) {
            return res.status(400).json({
                error: 'Invalid email/username or password'
            });
        }

        return res.status(200).json({
            data: account
        });
    } catch (err) {
        return res.status(400).json({
            error: err.message
        });
    }
};



module.exports = { loginWithEmailAndPassword: loginWithEmailOrUsernameAndPassword };