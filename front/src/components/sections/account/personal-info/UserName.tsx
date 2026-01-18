import { useState } from 'react';
import { Stack, TextField, Typography, Chip } from '@mui/material';
import { useAccounts } from 'providers/AccountsProvider';
import IconifyIcon from 'components/base/IconifyIcon';
import AccountDialog from '../common/AccountDialog';
import InfoCard from '../common/InfoCard';


interface Service {
  status?: string;
}

interface UserNameProps {
  service?: Service;
}

const UserName = ({ service }: UserNameProps) => {
  const { personalInfo } = useAccounts();
  const [open, setOpen] = useState(false);

  const handleClose = () => setOpen(false);

  const status = service?.status || "inactive"; // fallback

  // map status to color
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'success'; // green
      case 'inactive':
        return 'error'; // red
      case 'away':
        return 'warning'; // yellow/orange
      default:
        return 'default'; // gray
    }
  };

  return (
    <>
      <InfoCard setOpen={setOpen}>
    <Stack direction="row" spacing={1} alignItems="center">
      <Typography variant="body2" fontWeight={600}>
        Status:
      </Typography>
      <Chip
        label={status}
        color={getStatusColor(status)}
        size="small"
        variant="outlined"
        sx={{
          fontWeight: 600,
          textTransform: 'capitalize',
          cursor: 'default',
          minWidth: 70,
        }}
      />
    </Stack>


        <IconifyIcon
          icon="material-symbols-light:edit-outline"
          sx={{ fontSize: 20, color: 'neutral.dark', visibility: 'hidden' }}
        />
      </InfoCard>

      <AccountDialog
        title="User Name"
        subtitle="Update your username. This change will apply to your account and be visible to others in your interactions."
        open={open}
        handleConfirm={handleClose}
        handleDialogClose={handleClose}
        handleDiscard={handleClose}
        sx={{ maxWidth: 463 }}
      >
        <Stack direction="column" spacing={1} p={0.125}>
          <TextField
            placeholder="User Name"
            label="User Name"
            defaultValue={personalInfo.userName}
            fullWidth
          />
        </Stack>
      </AccountDialog>
    </>
  );
};

export default UserName;
