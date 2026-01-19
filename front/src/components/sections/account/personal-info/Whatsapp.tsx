import { useEffect, useState } from 'react';
import { Stack, TextField, Typography } from '@mui/material';
import { useAccounts } from 'providers/AccountsProvider';
import IconifyIcon from 'components/base/IconifyIcon';
import AccountDialog from '../common/AccountDialog';
import InfoCard from '../common/InfoCard';
import InfoCardAttribute from '../common/InfoCardAttribute';

const Email = ({ value, onChange }) => {
  const [primary, setPrimary] = useState(value.primaryEmail || '');
  const [secondary, setSecondary] = useState(value.secondaryEmail || '');


  const [open, setOpen] = useState(false);
  const { personalInfo } = useAccounts();



  const handleConfirm = () => {
    onChange({
      primaryEmail: primary,
      secondaryEmail: secondary,
    });
    setOpen(false);
  };

  useEffect(() => {
  setPrimary(value.primaryEmail || '');
  setSecondary(value.secondaryEmail || '');
}, [value]);


  return (
    <>
 <InfoCard setOpen={setOpen} sx={{ mb: 2 }}>
  <Stack direction="column" spacing={{ xs: 2, sm: 1 }}>
    <InfoCardAttribute label="Send to Number" value={value.primaryEmail} />
    <InfoCardAttribute label="WhatsApp Id" value={value.secondaryEmail} />
    <InfoCardAttribute label="WhatsApp Token" value={value.primaryEmail} />
    <InfoCardAttribute label="Template Name" value={value.secondaryEmail} />
  </Stack>
  <IconifyIcon
    icon="material-symbols-light:edit-outline"
    sx={{ fontSize: 20, color: 'neutral.dark', visibility: 'hidden' }}
  />
</InfoCard>

        <AccountDialog
          title="Whatsapp Configs"
          subtitle="Update your primary email address. You can also set an alternate email address for extra security and backup."
          open={open}
         handleConfirm={() => {
            onChange({ primaryEmail: primary, secondaryEmail: secondary });
            setOpen(false);
          }}
          handleDiscard={() => {
            setPrimary(value.primaryEmail || '');
            setSecondary(value.secondaryEmail || '');
            setOpen(false);
          }}
>
          <Stack direction="column" spacing={1} p={0.125}>
            <TextField
              placeholder="whatsapp_number"
              label="Send to Number"
              value={primary}
              onChange={(e) => setPrimary(e.target.value)}
              fullWidth
            />
            <TextField
              placeholder="WhatsApp Id"
              label="WhatsApp Id"
              value={secondary}
              onChange={(e) => setSecondary(e.target.value)}
              fullWidth
            />
            <TextField
              placeholder="Whatsapp Token"
              label="Whatsapp Token"
              value={primary}
              onChange={(e) => setPrimary(e.target.value)}
              fullWidth
            />
            <TextField
              placeholder="Template Name"
              label="Template Name"
              value={secondary}
              onChange={(e) => setSecondary(e.target.value)}
              fullWidth
            />
          </Stack>
        </AccountDialog>

      <Stack spacing={1} sx={{ color: 'info.main' }}>
        <IconifyIcon icon="material-symbols:info" sx={{ fontSize: 24 }} />
        <Typography variant="body2">
          Your alternate email will be used to gain access to your account if you ever have issues
          with logging in with your primary email.
        </Typography>
      </Stack>
    </>
  );
};

export default Email;
