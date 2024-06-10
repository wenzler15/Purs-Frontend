// --------------------------------------------------------------------
// ENVIRONMENT
// --------------------------------------------------------------------
export const IS_PRODUCTION = process.env.VITE_ENVIRONMENT === 'production' || false;
export const IS_DEVELOPMENT = process.env.VITE_ENVIRONMENT === 'development' || false;

// --------------------------------------------------------------------
// COOKIES
// --------------------------------------------------------------------
export const TOKEN_NAME = process.env.VITE_TOKEN_NAME || '@';