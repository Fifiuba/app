import axios from 'axios';

const getWalletInfo = async (id) => {
  try {
    const response = await axios.get(`https://payment-service-solfonte.cloud.okteto.net/payment/wallet/${id}`);
    return response.data;
  } catch (error) {
    return error;
  }
};

export default getWalletInfo;
