import axios from 'axios';
export default async function sendPushNotification(notification) {
  await axios.post(
      'https://api-gateway-solfonte.cloud.okteto.net/notification',
      {
        user_id: notification.user_id,
        title: notification.title,
        body: notification.body,
        data: notification.data,
      });
}
