import axios from 'axios';

const pay = async (receiverId, eth) => {
  const response = await axios.post(
      'https://payment-service-solfonte.cloud.okteto.net/payment/pay',
      {
        receiverId: receiverId,
        amountInEthers: eth,
      },
  );
  return response.data;
};

export default pay;
