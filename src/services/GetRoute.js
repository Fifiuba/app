import axios from 'axios';
// import {JOURNEY_SERVICE_KEY} from '@env';
/* eslint-disable max-len */
const INVALID_DIRECTIONS_ERROR = 'We are unable to route with the given locations.';

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
    'key': 'Plqx1ppoa0ARGH2Oo2uU5olizfNPb0Fo',
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
    if (response.data.info.messages == INVALID_DIRECTIONS_ERROR) {
      console.error('Direcciones inválidas');
      alert('No se encontraron resultados para esas direcciones');
      return null;
    } else {
      const shapePoints = response.data.route.shape.shapePoints;
      const routeCoords = getDirections(shapePoints);
      const distance = response.data.route.distance;
      return [routeCoords, distance];
    }
  } catch (error) {
    console.error(error.message);
    return null;
  }
};

export default getRoute;

