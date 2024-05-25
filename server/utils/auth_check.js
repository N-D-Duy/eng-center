const checkValidEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
};
const checkValidPassword = (password) => {
    return password.length >= 8;
};

module.exports = {
    checkValidEmail,
    checkValidPassword
};