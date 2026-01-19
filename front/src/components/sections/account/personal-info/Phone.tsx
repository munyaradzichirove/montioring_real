import { useState, useEffect } from 'react';
import { Stack, Typography } from '@mui/material';
import { useAccounts } from 'providers/AccountsProvider';
import IconifyIcon from 'components/base/IconifyIcon';
import PhoneTextfield from 'components/base/PhoneTextfield';
import AccountDialog from '../common/AccountDialog';
import InfoCard from '../common/InfoCard';
import InfoCardAttribute from '../common/InfoCardAttribute';

const Phone = ({ value, onChange }) => {
  const [open, setOpen] = useState(false);
  const { personalInfo } = useAccounts();

  const [phone, setPhone] = useState(value);


  useEffect(() => {
    setPhone(value);
  }, [value]);
  return (
    <>
      <InfoCard setOpen={setOpen} sx={{ mb: 2 }}>
        <Stack direction="column" spacing={{ xs: 2, sm: 1 }}>
          <InfoCardAttribute label="Number" value={phone || personalInfo.phoneNumber} />
        </Stack>
        <IconifyIcon
          icon="material-symbols-light:edit-outline"
          sx={{ fontSize: 20, color: 'neutral.dark', visibility: 'hidden' }}
        />
      </InfoCard>

      <AccountDialog
        title="Phone"
        subtitle="Ensure your phone number to enable account recovery and receive important notifications."
        open={open}
        handleConfirm={() => {
          if (!phone) return;
          onChange(phone);
          setOpen(false);
        }}
        handleDialogClose={() => setOpen(false)}
        handleDiscard={() => setOpen(false)}
        sx={{ maxWidth: 463 }}
      >
        <PhoneTextfield
          value={phone}
          onChange={(val) => setPhone(val)}
        />
      </AccountDialog>

      <Stack spacing={1}>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Make sure this is a number you check regularly so you don’t miss any alerts.
        </Typography>
      </Stack>
    </>
  );
};

export default Phone;
