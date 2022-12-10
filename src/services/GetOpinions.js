import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const getComments = async (id, userType) => {
	try {
		const token = await AsyncStorage.getItem('token');
		const response = await axios.get(
			`https://api-gateway-solfonte.cloud.okteto.net/users/opinions/${id}`,
			{
				params: {
					user_type: userType,
				},
				headers: { Authorization: `Bearer ${token}` },
			}
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
