import axios from 'axios';

const getWalletAmount = async (id) => {
  try {
    // const response = await axios.get(`wallet-url/wallet/${id}`,);
    // return response.data;
    let fakeResponse = {
        hash: '0xD788F452B25004d0Aec326d97D785B16ff196Cd4',
        amount: 0.0002
    }
    return fakeResponse
  } catch (error) {
    return error
  }
};

export default getWalletAmount;