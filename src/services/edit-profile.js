import axios from 'axios';

export default async function editProfile(data) {
  const body = {
    name: data.name,
    phone: data.phone,
    email: data.email,
    age: data.age,
  };

  axios.patch('http://192.168.0.16:8000/users/me', body)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
}
