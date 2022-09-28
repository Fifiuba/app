import axios from 'axios';

export default async function profile() {
	try {
		const response = await axios.get("http://localhost:8000/users/me");
		console.log(response);
        return response;
	}
	catch (error) {
		console.log(error);
        return error;
	}
}