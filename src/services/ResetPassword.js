import {getAuth, sendPasswordResetEmail} from 'firebase/auth';

import {errors} from '../utils/Errors';
import {error} from '../utils/HandleError';

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
  } catch (err) {
    console.log(err.message);
    console.log(errors.USER_NOT_FOUND_ERROR);
    setSend(false);
    setLoading(false);
    setVisible(true);

    if (err.message == errors.USER_NOT_FOUND_ERROR) {
      setMsg(error.USER_NOT_FOUND_ERROR);
    } else {
      setMsg(err.message);
    }
    return null;
  }
};

export default resetPassword;
