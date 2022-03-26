import axios from 'axios';

const API_URL = '/api/users/register';

//REGISTER a new USER
const register = async (userData) => {
  const responce = await axios.post(API_URL, userData);
  console.log(responce.data);
  if (responce.data) {
    localStorage.setItem('user', JSON.stringify(responce.data.user));
  }
  return responce.data;
};
const authService = {
  register,
};

export default authService;
