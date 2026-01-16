import { PropsWithChildren, ReactElement } from 'react';
import { TabPanel } from '@mui/lab';

interface AccountTabPanelProps {
  value: string;
}

const AccountTabPanel = ({ value, children }: PropsWithChildren<AccountTabPanelProps>): ReactElement => {
  return (
    <TabPanel value={value} sx={{ p: 0 }}>
      {children}
    </TabPanel>
  );
};

export default AccountTabPanel;
