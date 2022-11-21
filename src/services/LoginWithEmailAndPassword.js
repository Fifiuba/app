import axios from 'axios';
import {getAuth, signInWithEmailAndPassword} from 'firebase/auth';

// import {USER_SERVICE_URL} from '@env';
import {constants} from '../utils/Constants';

export default async function loginWithEmailAndPassword(data, userType) {
  console.log('Login with email and password');
  try {
    const token = await authFirebase(data);
    console.log('token firebase:', token);
    const response = await authUser(token, userType);
    console.log('response back:', response);
    return response;
  } catch (error) {
    console.error(error.message);
    return null;
  }
}

const authFirebase = async (data) => {
  try {
    console.log('authFirebase');
    const auth = getAuth();
    const userCredential =
      await signInWithEmailAndPassword(auth, data.email, data.password);
    const user = userCredential.user;
    const token = await user.getIdToken();
    return token;
  } catch (error) {
    console.error(error.message);
    return null;
  }
};

const authUser = async (token, userType) => {
  console.log('usertype:', userType);
  try {
    console.log('authUser');
    params = {
      'token': token,
      'user_type': userType,
    };
    const response =
      await axios.post('https://backend-agustinaa235.cloud.okteto.net/users/login', params);
    return response.data;
  } catch (error) {
    const errorMsg = error.response.data.detail;
    console.error(errorMsg);
    if (errorMsg == constants.DRIVER_NOT_EXIST_ERROR ||
      errorMsg == constants.PASSENGER_NOT_EXIST_ERROR) {
      alert(errorMsg);
    }
    return null;
  }
};
