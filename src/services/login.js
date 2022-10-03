import axios from 'axios';
import { auth } from '../../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

export default async function login(data) {
  console.log('login')
  try {
    const token = await authFirebase(data);
    const res = await authUser(token);
    localStorage.setItem('token', res.data['token']);
    console.log('res:', res)
    return res;
  } catch (e) {
    return;
  }
}

async function authFirebase(data) {
  console.log('authFirebase')
  const userCredential = 
    await signInWithEmailAndPassword(auth, data.email, data.password);
  const user = userCredential.user;
  const token = await user.getIdToken();
  console.log('token:', token)
  return token;
}

export function authUser(token) {
  console.log('authUser')
  axios.post('http://127.0.0.1:8000/users/login', token)
}