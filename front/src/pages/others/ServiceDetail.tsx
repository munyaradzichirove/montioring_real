import { SyntheticEvent, useState } from 'react';
import { TabContext } from '@mui/lab';
import { Container, Drawer, Paper, SnackbarCloseReason, Stack } from '@mui/material';
import { accountTabs } from 'data/account/account-tabs';
import ProSnackbar from 'layouts/main-layout/common/ProSnackbar';
import AccountsProvider from 'providers/AccountsProvider';
import { useBreakpoints } from 'providers/BreakpointsProvider';
import SimpleBar from 'components/base/SimpleBar';
import SideTabList from 'components/sections/account/SideTabList';
import AccountTabPanel from 'components/sections/account/common/AccountTabPanel';
import { useParams } from 'react-router-dom';
import PersonalInfoTabPanel from 'components/sections/account/personal-info/PersonalInfoTabPanel';
import LogsTabPanel from 'components/sections/account/personal-info/LogsTabPanel';
import { Button } from '@mui/material';



const Account = () => {
  const [open, setOpen] = useState(false);
  // const [activeTab, setActiveTab] = useState(accountTabs[0].value);
  const { down } = useBreakpoints();
  const [showTabList, setShowTabList] = useState(true);

  const downMd = down('md');
  const { servicename } = useParams(); // <-- make sure this is at the top
const [activeTab, setActiveTab] = useState('start');

const handleChange = async (_event: SyntheticEvent, newValue: string) => {
  setActiveTab(newValue);
  console.log("Action clicked: " + newValue + " for service: " + servicename);

  if (newValue === 'logs') return;

  if (!servicename) {
    console.error("No service name defined!");
    return;
  }

  try {
    const response = await fetch(
      `http://localhost:5000/api/service/${servicename}/${newValue}`,
      { method: 'POST' }
    );
    const data = await response.json();
    console.log("Service response:", data);

    if (data.success) setOpen(true);
  } catch (err) {
    console.error("Failed to call service API", err);
  }
};

  const dynamicTabs = [
    {
      id: 1,
      label: 'Start',
      title: '',
      value: 'start',
      icon: 'material-symbols:play-arrow-outline',
      panelIcon: 'material-symbols:play-arrow-outline',
      tabPanel: <PersonalInfoTabPanel serviceName={servicename} />,
    },
    {
      id: 2,
      label: 'Stop',
      value: 'stop',
      icon: 'material-symbols:stop-outline',
     tabPanel: <PersonalInfoTabPanel serviceName={servicename} />,
    },
    {
      id: 3,
      label: 'Reload',
      value: 'reload',
      icon: 'material-symbols:refresh-outline',
       tabPanel: <PersonalInfoTabPanel serviceName={servicename} />,
    },
    {
      id: 4,
      label: 'Enable',
      value: 'enable',
      icon: 'material-symbols:toggle-on-outline',
       tabPanel: <PersonalInfoTabPanel serviceName={servicename} />,
  
    },
    {
      id: 5,
      label: 'Disable',
      value: 'disable',
      icon: 'material-symbols:toggle-off-outline',
       tabPanel: <PersonalInfoTabPanel serviceName={servicename} />,
    },
    {
      id: 6,
      label: 'Logs',
      value: 'logs',
      icon: 'material-symbols:receipt-long-outline',
      tabPanel:<LogsTabPanel serviceName={servicename} />,
    },
  ];




  const handleClose = (_event: SyntheticEvent, reason?: SnackbarCloseReason) => {
    if (reason === 'clickaway') return;
    setOpen(false);
  };

  return (
    <AccountsProvider>
      <TabContext value={activeTab}>
        <Stack>
          {downMd ? (
            <Drawer
              hideBackdrop
              open={showTabList}
              onClose={() => setShowTabList(false)}
              ModalProps={{
                keepMounted: true,
                disablePortal: true,
              }}
              slotProps={{
                paper: {
                  sx: {
                    bgcolor: 'background.elevation1',
                    width: 1,
                    overflow: 'hidden',
                    pointerEvents: 'auto',
                    height: { xs: 'calc(100vh - 64px)', md: 'calc(100vh - 82px)' },
                    top: { xs: 65, md: 83 },
                  },
                },
              }}
              sx={{
                pointerEvents: 'none',
              }}
            >
              <SimpleBar>
                <SideTabList setShowTabList={setShowTabList} handleChange={handleChange} />
              </SimpleBar>
            </Drawer>
          ) : (
            <Paper
              background={1}
              sx={{
                width: { md: 324, lg: 405 },
                position: 'sticky',
                top: { xs: 64, md: 82 },
                height: { xs: 'calc(100vh - 64px)', md: 'calc(100vh - 82px)' },
              }}
            >
              <SimpleBar>
                <SideTabList setShowTabList={setShowTabList} handleChange={handleChange} />
              </SimpleBar>
            </Paper>
          )}

        <Paper sx={{ width: '100%', flex: 1 }}>
  <Container
    maxWidth={false} // allow full width
    sx={{
      px: { xs: 2, md: 5 }, // adjust padding
      py: 5,
      width: '90%',        // make container full width
      height: downMd ? '100%' : 'auto',
    }}
  >
    {dynamicTabs.map((tab) => (
      <AccountTabPanel
        key={tab.id}
        label={tab.label}
        value={tab.value}
        setShowTabList={setShowTabList}
      >
        {tab.tabPanel}
      </AccountTabPanel>
    ))}
  </Container>
</Paper>
          <ProSnackbar open={open} onClose={handleClose} />
        </Stack>
      </TabContext>
    </AccountsProvider>
  );
};

export default Account;
