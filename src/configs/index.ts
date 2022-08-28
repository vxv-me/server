export const PORT = process.env.PORT || 3030;

export const CORS_HOST_REGEXP: Array<RegExp> = [
  /http:\/\/localhost$/, // localhost without ports
  /http:\/\/localhost:(\d+)$/, // localhost with all ports
  /http:\/\/127.0.0.1$/,
  /http:\/\/127.0.0.1:(\d+)$/,
  /()?.vxv.me$/, // with subdomain
];

export const CORS_ALLOWED_HEADERS: Array<string> = [
  'Access-Control-Allow-Origin',
  'Origin',
  'X-Requested-With',
  'Accept',
  'Content-Type',
  'Authorization',
];
