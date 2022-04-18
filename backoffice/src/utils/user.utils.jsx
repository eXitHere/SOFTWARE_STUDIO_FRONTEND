import jwt_decode from 'jwt-decode';

function getUserInfo() {
    const token = localStorage.getItem('token');
    const decoded = jwt_decode(token);
    return {
        ...decoded,
        role: decoded[
            'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'
        ],
    };
}

export { getUserInfo };
