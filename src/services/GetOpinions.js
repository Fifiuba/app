import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const getComments = async (id,user_type) => {
  try {
    const token = await AsyncStorage.getItem('token');
    const response = await axios.get(
        `https://backend-agustinaa235.cloud.okteto.net/users/opinions/${id}`,
        {
            params:{
                user_type:user_type
            },
            headers: {Authorization: `Bearer ${token}`},
        },
    );
    return response.data;
  } catch (error) {
    console.error(error.message);
    if (error.message == 'Network Error') {
      alert('Problemas de conexión con el servidor');
    }
    return null;
  }
};

export default getComments;