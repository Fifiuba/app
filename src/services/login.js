import axios from 'axios';
import {getAuth, signInWithEmailAndPassword} from 'firebase/auth';
import {initializeApp} from 'firebase/app';

const firebaseConfig = {
  apiKey: "AIzaSyD_fAr5j7fbdhezakqnBmSLW2xEZ9Uki2U",
  authDomain: "user-service-9def8.firebaseapp.com",
  databaseURL: "https://user-service-9def8-default-rtdb.firebaseio.com",
  projectId: "user-service-9def8",
  storageBucket: "user-service-9def8.appspot.com",
  messagingSenderId: "627165168741",
  appId: "1:627165168741:web:23447b751047a7ca24b28c",
  measurementId: "G-YL8STET37V"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default async function login(data) {
  console.log('login')
  console.log('data:', data)
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
  axios.post('http://10.0.2.2:8000/users/login', token)
}