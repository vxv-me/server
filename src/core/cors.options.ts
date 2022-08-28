import { CORS_HOST_REGEXP, CORS_ALLOWED_HEADERS } from '~/configs/index';

export const originMathcRegexp = (
  origin: string,
  hostRegexp: Array<RegExp>,
): boolean => {
  for (let i = 0; i < hostRegexp.length; i++) {
    if (origin.match(hostRegexp[i])) {
      return true;
    }
  }
  return false;
};

export const checkOrigin = (origin: string): boolean => {
  return originMathcRegexp(origin, CORS_HOST_REGEXP);
};

export default {
  origin: (origin, callback) => {
    if (!origin || checkOrigin(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  allowedHeaders: CORS_ALLOWED_HEADERS,
  credentials: true,
  exposedHeaders: 'Authorization',
  methods: ['GET', 'PUT', 'OPTIONS', 'POST', 'DELETE'],
};
