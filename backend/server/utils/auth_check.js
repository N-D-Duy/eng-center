const checkValidEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
};
const checkValidPassword = (password) => {
    return password.length >= 8 && password.length <= 32 && containsSpecialCharacter(password) && containsNumber(password);
};

const containsSpecialCharacter = (str) => {
    const specialCharacters = "!@#$%^&*()-+";
    for (let i = 0; i < str.length; i++) {
        if (specialCharacters.includes(str[i])) {
            return true;
        }
    }
    return false;
};

const containsNumber = (str) => {
    for (let i = 0; i < str.length; i++) {
        if (!isNaN(str[i])) {
            return true;
        }
    }
    return false;
};

module.exports = {
    checkValidEmail,
    checkValidPassword
};