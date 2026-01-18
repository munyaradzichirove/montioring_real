import { Divider, Stack } from '@mui/material';
import AccountTabPanelSection2 from '../common/AccountTabPanelSection';
import AccountTabPanelSection from '../common/AccountTabPanelSection';
import Address from './Address';
import Email from './Email';
import Names from './Names';
import Phone from './Phone';
import UserName from './UserName';
import IconifyIcon, { IconifySecond } from 'components/base/IconifyIcon';
import { ArrowRepeat, ClipboardData, Whatsapp } from 'react-bootstrap-icons';
import {
  FormControlLabel,
  Radio,
  RadioGroup,
} from '@mui/material';

const PersonalInfoTabPanel = () => {
  return (
    <Stack direction="column" divider={<Divider />} spacing={5}>
      <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      padding: '12px 16px',
      backgroundColor: '#f9f9f9'
    }}>
  <span style={{ fontSize: '20px', fontWeight: 700 }}>⚙️</span>
  <span style={{ fontSize: '18px', fontWeight: 600 }}>Settings</span>
</div>

        <AccountTabPanelSection2
        title="Services Autorestart?"
        subtitle="Add a personal or official WhatsApp number to receive service notifications whenever a service goes down or for account recovery."
        icon={<ArrowRepeat size={20} />} //
      >
           <RadioGroup
  row
  defaultValue="no"
  aria-labelledby="address-visibility-radio-buttons"
>
  <FormControlLabel value="no" control={<Radio />} label="No" />
  <FormControlLabel value="yes" control={<Radio />} label="Yes" />
  </RadioGroup>
        {/* children content */}
      </AccountTabPanelSection2>

      <AccountTabPanelSection2
        title="Enable Alerts?"
        subtitle="Add a personal or official WhatsApp number to receive service notifications whenever a service goes down or for account recovery."
         icon={<ClipboardData size={20} />}
      >
            
  <RadioGroup
  row
  defaultValue="no"
  aria-labelledby="address-visibility-radio-buttons"
>
  <FormControlLabel value="no" control={<Radio />} label="No" />
  <FormControlLabel value="yes" control={<Radio />} label="Yes" />
  </RadioGroup>

        {/* children content */}
      </AccountTabPanelSection2>

      <AccountTabPanelSection2
        title="WhatsApp Number"
        subtitle="Add a personal or official WhatsApp number to receive service notifications whenever a service goes down or for account recovery."
        icon={<Whatsapp size={20} />} // React Bootstrap icon
      >
              <Phone />
        {/* children content */}
      </AccountTabPanelSection2>

      <AccountTabPanelSection
        title="Email Address"
        subtitle="Edit your primary email address for notifications and add an alternate email address."
        icon="material-symbols:mail-outline"
      >
        <Email />
      </AccountTabPanelSection>
    </Stack>
  );
};

export default PersonalInfoTabPanel;
