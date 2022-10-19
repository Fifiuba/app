import axios from 'axios';

export default async function loginWithGoogle(token, userType) {
  console.log('Login with google');
  try {
    console.log('token from firebase:', token);
    const response = await axios.post('http://192.168.0.76:8000/users/loginGoogle', {
      'user_type': userType,
      'token': token,
    });
    console.log('response_data:', response.data);
    return response.data;
  } catch (error) {
    alert(error.response.data.detail);
    console.error(error.response.data.detail);
    return null;
  }
}

