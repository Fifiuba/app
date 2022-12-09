import axios from 'axios';

const deposit = async (id) => {
    const senderId = id;
    const eth = '0.0005'
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