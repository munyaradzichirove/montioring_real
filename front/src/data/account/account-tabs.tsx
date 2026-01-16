import { AccountTab } from 'types/accounts';
import PersonalInfoTabPanel from 'components/sections/account/personal-info/PersonalInfoTabPanel';

export const accountTabs: AccountTab[] = [

  {
    id: 1,
    label: 'Start',
    title: '',
    value: 'start',
    icon: 'material-symbols:play-arrow-outline',
    panelIcon: 'material-symbols:play-arrow-outline',
    tabPanel: <PersonalInfoTabPanel/>,
  },
  {
    id: 2,
    label: 'Stop',
    title: 'Stop Service',
    value: 'stop',
    icon: 'material-symbols:stop-outline',
    panelIcon: 'material-symbols:stop-outline',
    tabPanel: <div>Stop service panel</div>,
  },
  {
    id: 3,
    label: 'Reload',
    title: 'Reload Service',
    value: 'reload',
    icon: 'material-symbols:refresh',
    panelIcon: 'material-symbols:refresh-outline',
    tabPanel: <div>Reload service panel</div>,
  },
  {
    id: 4,
    label: 'Enable',
    title: 'Enable Service',
    value: 'enable',
    icon: 'material-symbols:toggle-on-outline',
    panelIcon: 'material-symbols:toggle-on-outline',
    tabPanel: <div>Enable service panel</div>,
  },
  {
    id: 5,
    label: 'Disable',
    title: 'Disable Service',
    value: 'disable',
    icon: 'material-symbols:toggle-off-outline',
    panelIcon: 'material-symbols:toggle-off-outline',
    tabPanel: <div>Disable service panel</div>,
  },
  {
    id: 6,
    label: 'Logs',
    title: 'View Logs',
    value: 'logs',
    icon: 'material-symbols:receipt-long-outline',
    panelIcon: 'material-symbols:receipt-long-outline',
    tabPanel: <div>Logs panel</div>,
  },
];