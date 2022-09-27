import axios from 'axios';

export default function login(data) {
  console.log('data:\n\n', data);
  axios.post('http://localhost:8000/users/login', {
    'email': data.email,
    'password': data.password,
  })
      .then(function(response) {
        console.log(response);
        return true;
      })
      .catch(function(error) {
        console.log(error.response);
        return false;
      });
}
