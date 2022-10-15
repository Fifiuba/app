import {getAuth, sendPasswordResetEmail} from 'firebase/auth';

const resetPassword = async (email, setSend, setMsg, setLoading) => {
  try {
    const auth = getAuth();
    await sendPasswordResetEmail(auth, email);
    setSend(true);
    setLoading(false);
    setMsg('Email sent succesfully!');
  } catch(error) {
    const errorMessage = error.message;
    setSend(true);
    setLoading(false);
    setMsg(errorMessage);
  }
};

export default resetPassword;
