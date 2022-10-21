import {getAuth, sendPasswordResetEmail} from 'firebase/auth';

import {constants} from '../utils/Constants';

const resetPassword = async (email, setSend, setMsg, setLoading) => {
  console.log('Reset password');
  try {
    const auth = getAuth();
    await sendPasswordResetEmail(auth, email);
    setSend(true);
    setLoading(false);
    setMsg('Email enviado exitosamente');
    console.log('Email enviado exitosamente');
  } catch (error) {
    setSend(false);
    setLoading(false);
    if (error.message == constants.USER_NOT_FOUND_ERROR) {
      setMsg('Usuario no registrado');
      console.error(error.message);
    }
    return null;
  }
};

export default resetPassword;
