import axios from 'axios';

const deposit = async () => {
    const senderId = 21;
    const eth = '0.0002'
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