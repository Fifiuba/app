import axios from 'axios';

const sendResetEvent = async (email) => {
  await axios.post(
      `https://api-gateway-solfonte.cloud.okteto.net/users/restorePassword/${email}`,
  );
};

export default sendResetEvent;
