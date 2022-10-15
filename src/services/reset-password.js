import {getAuth, sendPasswordResetEmail} from 'firebase/auth';

const resetPassword = async (email, setSend, setMsg, setLoading) => {
  console.log('Reset password');
  try {
    const auth = getAuth();
    await sendPasswordResetEmail(auth, email);
    setSend(true);
    setLoading(false);
    setMsg('Mail enviado');
    console.log('Mail sent');
  } catch (error) {
    setSend(true);
    setLoading(false);
    setMsg('Error al enviar el mail');
    console.error(error.message);
    return null;
  }
};

export default resetPassword;
