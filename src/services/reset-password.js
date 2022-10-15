import {getAuth, sendPasswordResetEmail} from 'firebase/auth';

const resetPassword = async (email, setSend, setMsg, setLoading) => {
  try {
    const auth = getAuth();
    const response = await sendPasswordResetEmail(auth, email);
    if (response) {
      setSend(true);
      setLoading(false);
      setMsg('Email sent succesfully!');
    }
  } catch(error) {
    const errorMessage = error.message;
    setMsg(errorMessage);
    setSend(true);
  }
};

export default resetPassword;
