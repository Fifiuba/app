import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// import {USER_SERVICE_URL} from '@env';

export default async function scoreUser(userType, score, userId, comment) {
	try {
		/* eslint-disable max-len */
		const token = await AsyncStorage.getItem('token');
		console.log(userType);
		console.log(score);
		console.log(comment);
		console.log(userId);

		const response = await axios.patch(
			`https://api-gateway-solfonte.cloud.okteto.net/users/score/${userId}`,
			{
				user_type: userType,
				score: score,
				opinion: comment,
			},
			{
				headers: { Authorization: `Bearer ${token}` },
			}
		);
		return response.data;
	} catch (error) {
		throw error;
	}
}
