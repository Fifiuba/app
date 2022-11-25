import axios from 'axios';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// import {USER_SERVICE_URL} from '@env';

export default async function scoreUser(userType, score, userId, comment) {
  console.log('Score user:', userId);
  try {
    /* eslint-disable max-len */
    const response =
      await axios.patch(`https://backend-agustinaa235.cloud.okteto.net/users/score/${userId}`,
          {
            params: {
              user_type: userType,
              score: score,
              comment: comment,
            },
            headers: {Authorization: `Bearer ${token}`},
          });
    console.log('response data:', response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
}
