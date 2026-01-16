import { documentationPath } from 'lib/constants';

export const rootPaths = {
  root: '/',
  authRoot: 'auth',
};

const paths = {
  root: rootPaths.root,
  settings: `/settings`,
  users: `/users`,      // can keep for internal reference
  services: `/services`, // <- new
  account: `/account`,
  login: `/${rootPaths.authRoot}/login`,
  signup: `/${rootPaths.authRoot}/sign-up`,
  notifications: `/notifications`,
  documentation: documentationPath,
  404: `/404`,
};

export default paths;
