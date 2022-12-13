import {getAuth, sendPasswordResetEmail} from 'firebase/auth';

import {constants} from '../utils/Constants';

/* eslint-disable max-len */
const resetPassword = async (email, setSend, setMsg, setLoading, setVisible) => {
  console.log('Reset password');
  try {
    const auth = getAuth();
    await sendPasswordResetEmail(auth, email);
    setSend(true);
    setLoading(false);
    setMsg('Email enviado éxitosamente');
    console.log('Email enviado éxitosamente');
  } catch (error) {
    setSend(false);
    setLoading(false);
    setVisible(true);

    if (error.message == constants.USER_NOT_FOUND_ERROR) {
      setMsg('Usuario no encontrado');
    } else {
      setMsg(error.message);
    }
    return null;
  }
};

export default resetPassword;
