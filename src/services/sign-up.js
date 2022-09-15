import axios from 'axios';

export default function signup(data) {
  console.log('data:\n\n', data);
  axios.post('http://localhost:8000/passenger/create', {
    name: data.name,
    user_name: data.name,
    password: data.password,
    edad: 24,
  })
      .then(function(response) {
        console.log(response);
        return true;
      })
      .catch(function(error) {
        console.log(error);
        return false;
      });
}

