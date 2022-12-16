import axios from 'axios';
import {error} from '../utils/HandleError';

const sendTokenInfo = async (userId, token) => {
  try {
    console.log('token:' + token);
    const response = await axios.post(
        'https://api-gateway-solfonte.cloud.okteto.net/notification/new_user',
        {
          user_id: userId,
          token: token,
        },
    );
    return response.data;
  } catch (err) {
    alert(error.RECEIVE_NOTIFICATIONS_ERROR);
    return null;
  }
};

export default sendTokenInfo;
