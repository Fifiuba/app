import axios from 'axios';

export default async function getAddrsFromCoords(lat, long) {
  try {
    const response = await axios.get('http://www.mapquestapi.com/geocoding/v1/reverse', {
      params: {
        'key': 'Plqx1ppoa0ARGH2Oo2uU5olizfNPb0Fo',
        'location': `${lat}, ${long}`,
        'thumbMaps': false,
      },
    });

    const street = response.data.results[0].locations[0].street;
    console.log('console:' + street);
    return street;
  } catch (err) {
    console.error(err);
    alert(err);
  }
}
