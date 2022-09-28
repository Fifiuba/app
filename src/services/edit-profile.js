import axios from 'axios';

export default async function editProfile(data) {
  const body = {
    name: data.name,
    phone: data.phone,
    email: data.email,
    age: data.age,
  };

  axios.patch('http://localhost:8000/users/me', body)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
}