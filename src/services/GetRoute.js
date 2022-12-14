import axios from 'axios';
// import {JOURNEY_SERVICE_KEY} from '@env';
import {errors} from '../utils/Errors';
import {error} from '../utils/HandleError';

const getDirections = (data) => {
  const coords = [];
  for (let index = 0; index < data.length; index+=2) {
    const element = {latitude: data[index], longitude: data[index + 1]};
    coords.push(element);
  }
  return coords;
};

const getRoute = async (origin, destination, setText, setVisible) => {
  const params = {
    'key': 'Plqx1ppoa0ARGH2Oo2uU5olizfNPb0Fo',
    'from': origin,
    'to': destination,
    'unit': 'k',
    'generalize': 0,
  };

  try {
    const response = await axios.get('http://www.mapquestapi.com/directions/v2/route', {
      params,
    });

    const errorMessage = response.data.info.messages[0];
    if (errorMessage == errors.INVALID_LOCATION_ERROR) {
      setText(error.INVALID_LOCATION_ERROR);
      setVisible(true);
    } else if (errorMessage == errors.LESS_THAN_TWO_LOCATIONS_ERROR) {
      setText(error.LESS_THAN_TWO_LOCATIONS_ERROR);
      setVisible(true);
    } else {
      const shapePoints = response.data.route.shape.shapePoints;
      const routeCoords = getDirections(shapePoints);
      const distance = response.data.route.distance;
      return [routeCoords, distance];
    }
  } catch (error) {
    console.log(error.message);
    return null;
  }
};

export default getRoute;

