export const PORT = 'PORT';
export const PROXY = 'PROXY';
export const LINK_PREFIX = 'LINK_PREFIX';

export default () => ({
  [PORT]: process.env[PORT] || 3000,
  [LINK_PREFIX]: process.env[LINK_PREFIX] || 'http://localhost:3000/api/link/',
});
