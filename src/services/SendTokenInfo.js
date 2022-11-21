import axios from 'axios';

const sentTokenInfo = async (userId, token) => {
  try {
    const response = await axios.post(
        'https://notifications-service-alejovillores.cloud.okteto.net/notification/new_user',
        {
          user_id: userId,
          token: token,
        },
    );
    return response.data;
  } catch (error) {
    console.error(error.message);
    return null;
  }
};

export default sentTokenInfo;
