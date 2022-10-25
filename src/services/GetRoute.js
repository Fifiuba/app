import axios from 'axios';

import {JOURNEY_SERVICE_KEY} from '@env';

const getRouteCoords = (data, coords) => {
  console.log('Getting route coords');

  for (let idx = 0; idx < data.length; idx++) {
    const point = {
      'latitude': data[idx].startPoint.lat,
      'longitude': data[idx].startPoint.lng,
    };
    coords.push(point);
  }

  return coords;
};

const getLocationCoords = (data) => {
  console.log('Getting location coords:', data.length);
  const coords = [];

  for (let idx = 0; idx < data.length; idx++) {
    const point = {
      'latitude': data[idx].latLng.lat,
      'longitude': data[idx].latLng.lng,
    };
    console.log('point:', point);
    coords.push(point);
  }
  console.log('coords:', coords);
  return coords;
};

const getRoute = async (originCoords, origin, destination) => {
  const params = {
    key: JOURNEY_SERVICE_KEY,
    from: origin,
    to: destination,
  };
  console.log('params:', params);
  try {
    const response = await axios.get('http://www.mapquestapi.com/directions/v2/route', {
      params,
    });
    const maneuvers = response.data.route.legs[0].maneuvers;
    let routeCoords = [originCoords];
    routeCoords = getRouteCoords(maneuvers, routeCoords);
    const locations = response.data.route.locations;
    const locationCoords = getLocationCoords(locations);
    return [routeCoords, locationCoords];
  } catch (error) {
    console.error(error.message);
    return null;
  }
};

export default getRoute;

