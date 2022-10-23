import {constants} from '../utils/Constants';

export const isValid = (value) => {
  return (value != constants.EMPTY && value != 0 && !(value === null));
};
