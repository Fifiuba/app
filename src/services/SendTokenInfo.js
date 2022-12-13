import axios from 'axios';

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
  } catch (error) {
    alert('Su dispositivo no puede recibir notificaciones en esta version.');
    return null;
  }
};

export default sendTokenInfo;
