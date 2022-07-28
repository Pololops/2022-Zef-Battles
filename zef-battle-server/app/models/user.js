import Debug from 'debug';
const debug = Debug('Datamapper:userDatamapper:log');

import client from '../database/index.js';

/**
 * User model
 * @typedef {object} User
 * @property {number} id - The unique Pk id of the table
 * @property {string} name - The user name (firstname or surname)
 * @property {number} victory_number - The number of victory battle
 * @property {string} role - The user role (player or admin)
 */

export default {}
