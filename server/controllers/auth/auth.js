const Account = require('../../../models/account');
const loginWithEmailAndPassword = async (email, password) => {
    if (!email || !password) {
        return 'Email and password are required';
    } else if (!checkValidEmail(email)) {
        return 'Invalid email';
    } else if (!checkValidPassword(password)) {
        return 'Password must be at least 8 characters';
    } else {
        try {
            const account = await Account.findOne
                ({ email: email, password: password });
            return account;
        }
        catch (err) {
            return err.message;
        }
    }
};

module.exports = { loginWithEmailAndPassword };