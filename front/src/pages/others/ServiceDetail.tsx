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
  const handleChange = (_event: SyntheticEvent, newValue: string): void => {
    setActiveTab(newValue);
 console.log("THe service clicked"+newValue);

    // if (newValue !== 'personal_information') {
    //   setOpen(true);
    // }
  };

  const { servicename } = useParams();
  const [activeTab, setActiveTab] = useState('start');

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

          <Paper sx={{ flex: 1, maxWidth: 1 }}>
            <Container
              maxWidth={false}
              sx={{
                px: { xs: 3, md: 5 },
                py: 5,
                maxWidth: { xs: 628, md: 660 },
                overflowY: 'hidden',
                height: downMd ? 1 : 'auto',
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
