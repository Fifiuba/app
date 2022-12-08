import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';


const cancelJourney = async (journeyInfo) => {
  const id = journeyInfo.id;
  const token = await AsyncStorage.getItem('token');
  try {
    const response = await axios.patch(
        `https://api-gateway-solfonte.cloud.okteto.net/journey/cancel/${id}`,
        {
          id: journeyInfo.id,
          status: journeyInfo.status,
          idPassenger: journeyInfo.idPassenger,
          price: journeyInfo.price,
          startOn: journeyInfo.startOn,
          finishOn: journeyInfo.finishOn,
          from: journeyInfo.from,
          to: journeyInfo.to,
        },
        {
          headers: {Authorization: `Bearer ${token}`}
        }
    );
    console.log('response cancel journey:', response.data);
    return response.data;
  } catch (error) {
    console.error(error.message);
    return null;
  }
};

export default cancelJourney;
