import axios from 'axios';

const getFields = (data) => {
  const userInfo = {};
  const typeUserInfo = {};

  const keys = Object.getOwnPropertyNames(data);

  for (let idx = 0; idx < keys.length; idx++) {
    const key = keys[idx];
    const value = data[key];
    if (value != '' || value != 0) {
      typeUserInfo[key] = value;
    }
  }
  return [userInfo, typeUserInfo];
};

export default async function setUserTypeInfo(data, userId, userType) {
  console.log('setUserTypeInfo');
  try {
    const params = {
      user_type: userType,
      fields: getFields(data),
    };
    console.log('params:', params);
    console.log('userId:', userId);

    const response = await axios.patch(
        `https://backend-agustinaa235.cloud.okteto.net/users/${userId}`,
        params,
    );
    console.log('response:', response.data);
    return response.data;
  } catch (error) {
    alert(error.response.data.detail);
    console.error(error.response.data.detail);
    return null;
  }
}
