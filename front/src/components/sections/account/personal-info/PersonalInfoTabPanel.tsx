import { Divider, Stack } from '@mui/material';
import AccountTabPanelSection2 from '../common/AccountTabPanelSection';
import AccountTabPanelSection from '../common/AccountTabPanelSection';
import Address from './Address';
import Email from './Email';
import Names from './Names';
import Phone from './Phone';
import UserName from './UserName';
import IconifyIcon, { IconifySecond } from 'components/base/IconifyIcon';
import { Whatsapp } from 'react-bootstrap-icons';






interface PersonalInfoTabPanelProps {
  serviceName?: string;
}

const PersonalInfoTabPanel = ({ serviceName }: PersonalInfoTabPanelProps) => {
  return (
    <Stack direction="column" divider={<Divider />} spacing={5}>
      <AccountTabPanelSection
        title={serviceName || "Service Name"} // ← dynamic now
        subtitle="Edit your name here if you wish to make any changes."
        icon="material-symbols:badge-outline"
      >
        <Stack direction="column" spacing={1}>
          <UserName />
        </Stack>
      </AccountTabPanelSection>

      <AccountTabPanelSection
        title="Service Information"
        subtitle="You can edit your address and control who can see it."
        icon="material-symbols:info-outline"
      >
        <Address />
      </AccountTabPanelSection>
    </Stack>
  );
};


export default PersonalInfoTabPanel;
