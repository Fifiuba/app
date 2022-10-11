import {getAuth, sendPasswordResetEmail} from 'firebase/auth';

const resetPassword = (email, setSend, setMsg, setLoading) => {
  const auth = getAuth();
  sendPasswordResetEmail(auth, email)
      .then(() => {
        setSend(true);
        setLoading(false);
        setMsg('Email sent succesfully!');
      })
      .catch((error) => {
        const errorMessage = error.message;
        setSend(true);
        setLoading(false);
        setMsg(errorMessage);
      });
};

export default resetPassword;
