import axios from 'axios';

export default function loginWithGoogle(token) {
  console.log('token:\n\n', token);
  axios.post('http://10.0.2.2:8000/users/loginGoogle', {
    'user_type': 'driver',
    'token': token,
  })
    .then(function(response) {
        console.log('response:',response);
        return true;
    })
    .catch(function(error) {
        alert(error.message);
        console.log(error.response.data.error);
        return false;
    });
}

