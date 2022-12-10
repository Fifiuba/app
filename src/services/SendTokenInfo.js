import axios from 'axios';

const sentTokenInfo = async (userId, token) => {
	try {
		const response = await axios.post(
			'https://api-gateway-solfonte.cloud.okteto.net/notification/new_user',
			{
				user_id: userId,
				token: token,
			}
		);
		return response.data;
	} catch (error) {
		alert('Su dispositivo no puede recibir notificaciones en esta version.');
		console.error(error.message);
		return null;
	}
};

export default sentTokenInfo;
