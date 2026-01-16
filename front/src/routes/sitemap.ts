import { HTMLAttributeAnchorTarget } from 'react';
import { SxProps } from '@mui/material';
import paths, { rootPaths } from './paths';

export interface SubMenuItem {
  name: string;
  pathName: string;
  key?: string;
  selectionPrefix?: string;
  path?: string;
  target?: HTMLAttributeAnchorTarget;
  active?: boolean;
  icon?: string;
  iconSx?: SxProps;
  items?: SubMenuItem[];
}

export interface MenuItem {
  id: string;
  key?: string; // used for the locale
  subheader?: string;
  icon: string;
  target?: HTMLAttributeAnchorTarget;
  iconSx?: SxProps;
  items: SubMenuItem[];
}

const sitemap: MenuItem[] = [
  {
    id: 'pages',
    icon: 'material-symbols:view-quilt-outline',
    items: [
      {
        name: 'Dashboard',
        path: paths.services, // <- new
        pathName: 'services',
        icon: 'material-symbols:query-stats-rounded',
        active: true,
      },
      {
        name: 'Login',
        icon: 'material-symbols:login',
        path: paths.login,
        pathName: 'login',
        active: true,
      },
      {
        name: 'Sign up',
        icon: 'material-symbols:person-add-outline',
        path: paths.signup,
        pathName: 'sign-up',
        active: true,
      },
       {
        name: 'Settings',
        path: paths.settings,
        pathName: 'settings',
        icon: 'material-symbols:play-circle-outline-rounded',
        active: true,
      },
      {
        name: 'Support',
        icon: 'material-symbols:description-outline-rounded',
        path: paths.documentation,
        pathName: 'documentation',
        active: true,
        target: '_blank',
      }
    ],
  },
];

export default sitemap;
