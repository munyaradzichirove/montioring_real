import { Stack, Typography, Box } from '@mui/material';

interface InfoCardAttributeProps {
  label: string;
  value: string;
}

export const InfoCardAttribute = ({ label, value }: InfoCardAttributeProps) => {
  return (
    <Stack spacing={1} direction={{ xs: 'column', sm: 'row' }}>
      <Typography variant="subtitle2" sx={{ minWidth: 120, fontWeight: 700 }}>
        {label}
      </Typography>
      <Typography variant="subtitle2" sx={{ fontWeight: 400, overflowWrap: 'anywhere' }}>
        {value}
      </Typography>
    </Stack>
  );
};

export const InfoCardStatus = ({ label, value }: InfoCardAttributeProps) => {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'running':
        return 'success.main'; // green
      case 'idle':
        return 'warning.main'; // orange
      case 'sleeping':
        return 'error.main'; // red
      default:
        return 'text.secondary'; // gray
    }
  };

  return (
    <Stack spacing={0.5} direction={{ xs: 'column', sm: 'row' }} alignItems="center">
      <Typography variant="subtitle2" sx={{ minWidth: 120, fontWeight: 700 }}>
        {label}
      </Typography>
      <Box
        sx={{
          px: 1.25,
          py: 0.4,
          borderRadius: '16px',
          bgcolor: getStatusColor(value),
          display: 'inline-block',
        }}
      >
        <Typography
          variant="subtitle2"
          sx={{ fontWeight: 500, color: 'common.white', textTransform: 'capitalize' }}
        >
          {value}
        </Typography>
      </Box>
    </Stack>
  );
};

export default InfoCardAttribute;
