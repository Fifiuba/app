import axios from 'axios';


export default async function loginWithGoogle(token, userType) {
  console.log('Login with google');
  try {
    console.log('token from firebase:', token);
    const response = await axios.post('https://backend-agustinaa235.cloud.okteto.net/users/loginGoogle', {
      'user_type': userType,
      'token': token,
    });
    console.log('response_data:', response.data);
    return response.data;
  } catch (error) {
    alert(error.response.data.detail);
    console.error(error.response.data.detail);
    console.error(error.response.status);

    return null;
  }
}

