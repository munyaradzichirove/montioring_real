import { useEffect, useState } from 'react';
import { Button, Divider, Stack } from '@mui/material';
import AccountTabPanelSection2 from '../common/AccountTabPanelSection';
import AccountTabPanelSection from '../common/AccountTabPanelSection';
import Email from './Email';
import Phone from './Phone';
import { ArrowRepeat, ClipboardData, Whatsapp } from 'react-bootstrap-icons';
import { FormControlLabel, Radio, RadioGroup } from '@mui/material';

const PersonalInfoTabPanel = () => {
  const [settings, setSettings] = useState(null); // null until loaded

  const savedData = {
  autorestart: 'yes',
  enableAlerts: 'yes',
  whatsappNumber: '(+',
  primaryEmail: 's11.com',
  secondaryEmail: 'ff.alternate@email.com'
};

  useEffect(() => {
    // simulate fetching saved values
    setSettings(savedData);
  }, []);

  if (!settings) return null; // or loader

  const handleSave = () => {
    console.log('All settings:', settings);
  };

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
        icon={<ArrowRepeat size={20} />}
      >
        <RadioGroup
          row
          value={settings.autorestart}
          onChange={(e) => setSettings({...settings, autorestart: e.target.value})}
        >
          <FormControlLabel value="no" control={<Radio />} label="No" />
          <FormControlLabel value="yes" control={<Radio />} label="Yes" />
        </RadioGroup>
      </AccountTabPanelSection2>

      <AccountTabPanelSection2
        title="Enable Alerts?"
        subtitle="Add a personal or official WhatsApp number to receive service notifications whenever a service goes down or for account recovery."
        icon={<ClipboardData size={20} />}
      >
        <RadioGroup
          row
          value={settings.enableAlerts}
          onChange={(e) => setSettings({...settings, enableAlerts: e.target.value})}
        >
          <FormControlLabel value="no" control={<Radio />} label="No" />
          <FormControlLabel value="yes" control={<Radio />} label="Yes" />
        </RadioGroup>
      </AccountTabPanelSection2>

      <AccountTabPanelSection2
        title="WhatsApp Number"
        subtitle="Add a personal or official WhatsApp number to receive service notifications whenever a service goes down or for account recovery."
        icon={<Whatsapp size={20} />}
      >
        <Phone
          value={settings.whatsappNumber}
          onChange={(val) => setSettings({...settings, whatsappNumber: val})}
        />
      </AccountTabPanelSection2>

      <AccountTabPanelSection
        title="Email Address"
        subtitle="Edit your primary email address for notifications and add an alternate email address."
        icon="material-symbols:mail-outline"
      >
        <Email
          value={{
            primaryEmail: settings.primaryEmail,
            secondaryEmail: settings.secondaryEmail
          }}
          onChange={(val) =>
            setSettings((prev) => ({ ...prev, ...val }))
          }
        />
      </AccountTabPanelSection>

       <Button
        variant="contained"
        color="primary"
        sx={{ 
          flexShrink: 0,
          width: 200,      // <-- set your width here (px)
          maxWidth: '100%', // optional: don't let it overflow
        }}
        onClick={(e) => handleSave()} // your function
      >
        Save
      </Button>
    </Stack>
  );
};

export default PersonalInfoTabPanel;
