import axios from 'axios';
import {getAuth, signInWithEmailAndPassword} from 'firebase/auth';

export default async function loginWithEmailAndPassword(data) {
  console.log('login with email and password');
  try {
    const token = await authFirebase(data);
    console.log('token firebase:', token);
    const response = await authUser(token);
    console.log('response back:', response);
    return response;
  } catch (error) {
    console.error(error.message);
    alert(error.message);
    return nill;
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
    alert(error.message);
    return nill;
  }
};

const authUser = async (token) => {
  try {
    console.log('authUser');
    params = {
      'token': token,
    };
    const response = await axios.post('http://192.168.0.76:8000/users/login', params);
    return response.data;
  } catch (error) {
    console.error(error.message);
    alert(error.message);
    return nill;
  }
};
