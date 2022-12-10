import axios from 'axios';

const pay = async (id) => {
  const receiverId = id;
  const eth = '0.0005';
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
