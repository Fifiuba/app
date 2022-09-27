import axios from 'axios';

export default function signup(data) {
  console.log('data:\n\n', data);
  axios.post('http://10.0.2.2:8000/users', {
    'user_type': data.type,
    'name': data.name,
    'password': data.password,
    'phone_number': data.phone,
    'email': data.email,
    'age': data.age,
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

