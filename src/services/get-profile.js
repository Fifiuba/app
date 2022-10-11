import axios from 'axios';

export default async function getProfile() {
  try {
    const response = await axios.get('http://192.168.0.16:8000/users/me');
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
}
