import axios from 'axios';

const API_URL = '/api/users/';

//REGISTER a new USER
const register = async (userData) => {
  const responce = await axios.post(API_URL + 'register', userData);
  console.log(responce.data);
  if (responce.data) {
    localStorage.setItem('user', JSON.stringify(responce.data.user));
  }
  return responce.data;
};

//LOGIN
const login = async (userData) => {
  const responce = await axios.post(API_URL + 'login', userData);
  console.log(responce.data);
  if (responce.data) {
    localStorage.setItem('user', JSON.stringify(responce.data.user));
  }
  return responce.data;
};

//Log Out
const logout = () => {
  localStorage.removeItem('user');
};

const authService = {
  register,
  logout,
  login,
};

export default authService;
