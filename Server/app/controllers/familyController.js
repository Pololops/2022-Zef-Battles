import Debug from 'debug';
const debug = Debug('Controller:familyController:log');

import ApiError from '../errors/apiError.js';

import family from '../models/family.js';

const familyController = {
  async getAll(_, response) {
    const families = await family.findAll();
    return response.json(families);
  }
};

export default familyController;
