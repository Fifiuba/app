import {getAuth, sendPasswordResetEmail} from 'firebase/auth';

const resetPassword = async (email, setSend, setMsg, setLoading) => {
  console.log('Reset password');
  try {
    const auth = getAuth();
    await sendPasswordResetEmail(auth, email);
    setSend(true);
    setLoading(false);
    setMsg('Email sent succesfully!');
    console.log('Email sent');
  } catch(error) {
    setSend(true);
    setLoading(false);
    setMsg(error.message);
    console.error(error.message);
    return null;
  }
};

export default resetPassword;
