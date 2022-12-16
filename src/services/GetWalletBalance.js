import axios from 'axios';

const getWalletBalance = async (id) => {
  try {
    const response = await axios.get(`https://payment-service-solfonte.cloud.okteto.net/payment/wallet/balance/${id}`);
    return response.data;
  } catch (error) {
    return error;
  }
};

export default getWalletBalance;
