import axios from 'axios';

import {JOURNEY_SERVICE_KEY} from '@env';

const getDirections = (data) => {
  const coords = [];
  for (let index = 0; index < data.length; index+=2) {
    const element = {latitude: data[index], longitude: data[index + 1]};
    coords.push(element);
  }
  return coords;
};

const getRoute = async (origin, destination) => {
  const params = {
    'key': JOURNEY_SERVICE_KEY,
    'from': origin,
    'to': destination,
    'unit': 'k',
    'generalize': 0,
  };
  console.log('params:', params);
  try {
    const response = await axios.get('http://www.mapquestapi.com/directions/v2/route', {
      params,
    });
    const shapePoints = response.data.route.shape.shapePoints;
    const routeCoords = getDirections(shapePoints);
    const distance = response.data.route.distance;
    return [routeCoords, distance];
  } catch (error) {
    /* if (error.message == "We are unable to route with the given locations.");
      alert('No se encontraron resultados para esas direcciones');*/
    console.error(error.message);
    return null;
  }
};

export default getRoute;

