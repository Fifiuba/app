import axios from 'axios';

const getWalletAmount = async (id) => {
  try {
    // const response = await axios.get(`wallet-url/wallet/${id}`,);
    // return response.data;
    return {amount: 0.0002}
  } catch (error) {
    return error
  }
};

export default getWalletAmount;