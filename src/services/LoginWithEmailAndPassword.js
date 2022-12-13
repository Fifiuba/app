import axios from 'axios';
import {getAuth, signInWithEmailAndPassword} from 'firebase/auth';

// import {USER_SERVICE_URL} from '@env';

export default async function loginWithEmailAndPassword(data, userType) {
  console.log('Login with email and password');
  try {
    const token = await authFirebase(data);
    console.log('token firebase:', token);
    const response = await authUser(token, userType);
    console.log('response back:', response);
    return response;
  } catch (error) {
    return null;
  }
}

const authFirebase = async (data) => {
  try {
    console.log('authFirebase');
    const auth = getAuth();
    const userCredential = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password,
    );
    const user = userCredential.user;
    const token = await user.getIdToken();
    return token;
  } catch (error) {
    return null;
  }
};

const authUser = async (token, userType) => {
  console.log('authUser');
  try {
    const params = {
      token: token,
      user_type: userType,
    };
    const response = await axios.post(
        'https://api-gateway-solfonte.cloud.okteto.net/users/login',
        params,
    );
    return response.data;
  } catch (error) {
    console.log('error:', error);
    return null;
  }
};
