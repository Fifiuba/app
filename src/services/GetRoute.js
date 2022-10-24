import axios from 'axios';

import {JOURNEY_SERVICE_KEY} from '@env';

const getCoords = (data, coords) => {
  console.log('Getting coords');

  for (let idx = 0; idx < data.length; idx++) {
    const point = {
      'latitude': data[idx].startPoint.lat,
      'longitude': data[idx].startPoint.lng,
    };
    coords.push(point);
  }

  return coords;
};

const getRoute = async (originCoords) => {
  const params = {
    key: JOURNEY_SERVICE_KEY,
    from: 'Junín, Argentina',
    to: 'Mar del Plata, Argentina',
  };
  console.log('params:', params);
  try {
    const response = await axios.get('http://www.mapquestapi.com/directions/v2/route', {
      params,
    });
    const maneuvers = response.data.route.legs[0].maneuvers;
    let coords = [originCoords];
    coords = getCoords(maneuvers, coords);
    return coords;
  } catch (error) {
    console.error(error.message);
    return null;
  }
};

export default getRoute;

