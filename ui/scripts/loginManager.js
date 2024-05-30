export const isLogin = () => {
    return localStorage.getItem('loggedIn') === 'true';
}
export function authenticate(username, password) {
    const validUsername = "user";
    const validPassword = "password";

    if (username === validUsername && password === validPassword) {
        return true;
    } else {
        return false;
    }
}