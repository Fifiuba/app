import axios from 'axios';

export default function login(data) {
  console.log('data:\n\n', data);
  axios.post('http://10.0.2.2:8000/users/login', {
    user_name: data.mail,
    password: data.password,
    type: data.type,
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
