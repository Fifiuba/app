import axios from 'axios';

export default async function loginWithGoogle(token, user_type) {
  try {
    console.log('Entre a google')
    console.log('token:\n\n', token);
    console.log('user_type:\n\n', user_type);
    const response = await axios.post('http://192.168.0.16:8000/users/loginGoogle', {
      'user_type': user_type,
      'token': token,
    })
    console.log('response:', response.data)
    return response.data
  } catch(error) {
    alert(error.message);
    console.error(error.message);
  }
}

