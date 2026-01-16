import { SyntheticEvent, useState } from 'react';
import { TabContext } from '@mui/lab';
import { Container, Paper, SnackbarCloseReason, Stack } from '@mui/material';
import { accountTabs } from 'data/account/account-tabs';
import ProSnackbar from 'layouts/main-layout/common/ProSnackbar';
import AccountsProvider from 'providers/AccountsProvider';
import AccountTabPanel22 from 'components/sections/account/common/AccountTabPanel22';
import PersonalInfoTabPanel from 'components/sections/account/personal-info/PersonalInfoTabPanel22';
const Account = () => {
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(accountTabs[0].value);

  const handleChange = (_event: SyntheticEvent, newValue: string): void => {
    setActiveTab(newValue);
  };

  const handleClose = (_event: SyntheticEvent, reason?: SnackbarCloseReason) => {
    if (reason === 'clickaway') return;
    setOpen(false);
  };

  return (
    <AccountsProvider>
      <TabContext value={activeTab}>
        <Stack>
      <Paper sx={{ width: '100%', maxWidth: 1 }}>
<Container
  maxWidth={true}
  sx={{
   
    py: 5,
    width: '100%',
 

  }}
>

  {/* {
    id: 1,
    label: 'Start',
    title: '',
    value: 'start',
    icon: 'material-symbols:play-arrow-outline',
    panelIcon: 'material-symbols:play-arrow-outline',
    tabPanel: <PersonalInfoTabPanel/>,
  }, */}

      
      <AccountTabPanel22

        value={"start"}

      >
        {PersonalInfoTabPanel()}
      </AccountTabPanel22>
  
  </Container>
</Paper>

       
        </Stack>
      </TabContext>
    </AccountsProvider>
  );
};

export default Account;
