import axios from 'axios';

export default async function signUp(data, userType) {
  console.log('sign Up');
  try {
    console.log('data:', data);
    const response = await axios.post('http://192.168.0.76:8000/users', {
      'user_type': userType,
      'name': data.name,
      'password': data.password,
      'phone_number': data.phone_number,
      'email': data.email,
      'age': data.age,
    });
    console.log('response data:', response.data);
    return response.data;
  } catch (error) {
    alert(error.message);
    console.error(error.response);
    return null;
  }
}

