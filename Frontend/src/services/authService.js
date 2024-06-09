// src/services/authService.js
const TOKEN_KEY = 'user';

const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem(TOKEN_KEY));
};

const login = async (email, password) => {
    const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    });
    const data = await response.json();
    if (data.token) {
        localStorage.setItem(TOKEN_KEY, JSON.stringify(data));
    }
    return data;
};

const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    window.location.href = '/login';
};

const register = async (user) => {
    const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    });
    const data = await response.json();
    if (data.token) {
        localStorage.setItem(TOKEN_KEY, JSON.stringify(data));
    }
    return data;
};

export default {
    getCurrentUser,
    login,
    logout,
    register
};
