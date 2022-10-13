import { general } from './general';

const specific = {
  production: true,
  API_URL: 'https://api-transferencias.herokuapp.com',
  API_BASE: '/api/v1'
};

export const environment = { ...general, ...specific };
