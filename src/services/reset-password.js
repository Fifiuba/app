import {getAuth, sendPasswordResetEmail} from 'firebase/auth';

const resetPassword = async (email, setSend, setMsg) => {
  try {
    const auth = getAuth();
    const response = await sendPasswordResetEmail(auth, email);
    if (response) {
      console.log('response data:', response.data);
      setSend(true);
      setMsg('Email enviado');
    }
  } catch (error) {
    setMsg('Error');
    setSend(true);
    alert(error.message);
    console.alert(error.response);
  }
};

export default resetPassword;
