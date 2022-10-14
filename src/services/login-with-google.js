import axios from 'axios';

export default async function loginWithGoogle(token, userType) {
  try {
    console.log('Entre a google');
    console.log('token:\n\n', token);
    console.log('user_type:\n\n', userType);
    const response = await axios.post('http://192.168.0.76:8000/users/loginGoogle', {
      'user_type': userType,
      'token': token,
    });
    console.log('response:', response);
    console.log('response_data:', response.data);
    return response.data;
  } catch (error) {
    alert(error.message);
    console.error(error.message);
    return nill;
  }
}

