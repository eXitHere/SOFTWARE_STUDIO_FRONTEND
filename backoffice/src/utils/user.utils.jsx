import jwt_decode from 'jwt-decode';

function getUserInfo() {
    const token = localStorage.getItem('token');
    const decoded = jwt_decode(token);
    return decoded;
}

export { getUserInfo };