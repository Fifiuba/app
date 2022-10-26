import axios from 'axios';
import {getAuth, signInWithEmailAndPassword} from 'firebase/auth';

import {USER_SERVICE_URL} from '@env';

export default async function loginWithEmailAndPassword(data) {
  console.log('Login with email and password');
  try {
    const token = await authFirebase(data);
    console.log('token firebase:', token);
    if (token === null) {
      alert('Usuario no encontrado');
      return null;
    }
    const response = await authUser(token);
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

const authUser = async (token) => {
  try {
    console.log('authUser');
    params = {
      'token': token,
    };
    const response = await axios.post(`${USER_SERVICE_URL}/users/login`, params);
    return response.data;
  } catch (error) {
    alert(error.response);
    console.error(error.response);
    return null;
  }
};
