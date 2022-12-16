import axios from 'axios';

const deposit = async (senderId, eth) => {
  const response = await axios.post(
      'https://payment-service-solfonte.cloud.okteto.net/payment/deposit',
      {
        senderId: senderId,
        amountInEthers: eth,
      },
  );
  return response.data;
};

export default deposit;
