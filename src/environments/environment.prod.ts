import { general } from './general';

const specific = {
  production: true,
  API_URL: 'http://localhost:3000',  // TODO: Cambiar
  API_BASE: '/api/v1'
};

export const environment = { ...general, ...specific };
