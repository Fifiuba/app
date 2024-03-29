import axios from 'axios';
// import {USER_SERVICE_URL} from '@env';
import {constants} from '../utils/Constants';

export default async function signUp(data, userType) {
  console.log('sign Up');
  try {
    console.log('data:', data);
    const response = await axios.post(
        'https://api-gateway-solfonte.cloud.okteto.net/users',
        {
          user_type: userType,
          name: data.name,
          password: data.password,
          phone_number: data.phone_number,
          email: data.email,
          age: data.age,
          picture: constants.DEFAULT_URL_USER_PICTURE,
        },
    );
    console.log('response data:', response.data);
    return response.data;
  } catch (error) {
    console.log(error.response);
    return null;
  }
}
