import axios from 'axios';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

export default async function login(data) {
  console.log('login')
  try {
    const token = await authFirebase(data);
    const res = await authUser(token);
    console.log('res:', res)
    return res;
  } catch (e) {
    console.log('error:', e)
    return;
  }
}

async function authFirebase(data) {
  console.log('authFirebase')
  const auth = getAuth();
  const userCredential = 
    await signInWithEmailAndPassword(auth, data.email, data.password);
  const user = userCredential.user;
  const token = await user.getIdToken();
  console.log('token:', token)
  return token;
}

export function authUser(token) {
  console.log('authUser')
  axios.post('http://10.0.2.2:8000/users/login', token)
    .then(function(response) {
      console.log('response:', response);
      return response;
    })
    .catch(function(error) {
      console.log('error:', error);
      return error;
    });
}