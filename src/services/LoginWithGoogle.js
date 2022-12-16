import axios from 'axios';

export default async function loginWithGoogle(token, userType) {
  console.log('Login with google');

  console.log('token from firebase:', token);
  const response = await axios.post(
      'https://api-gateway-solfonte.cloud.okteto.net/users/loginGoogle',
      {
        user_type: userType,
        token: token,
      },
  );
  console.log('response_data:', response.data);
  return response.data;
}
