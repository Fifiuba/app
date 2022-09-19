import axios from 'axios';

export default function signup(data) {
  console.log('data:\n\n', data);
  axios.post('http://10.0.2.2:8000/users/passenger/create', {
    'name': data.name,
    'password': data.password,
    'phone_number': data.phone,
    'age': 30,
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

