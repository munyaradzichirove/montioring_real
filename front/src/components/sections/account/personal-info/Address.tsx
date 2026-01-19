import { useState, useEffect } from 'react';
import {
  Button,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Stack,
  Typography,
} from '@mui/material';
import InfoCard from '../common/InfoCard';
import InfoCardAttribute from '../common/InfoCardAttribute';

// demo JSON for notify only
const demoService = {
  notifyOnFail: true,
};

interface Service {
  sub?: string;
  uptime?: string;
  memory?: string;
  cpu?: string;
  threads?: string;
  restart_count?: string;
  notifyOnFail?: boolean;
}

interface AddressProps {
  service: Service; // keep the other stats coming from parent as before
}

const Address = ({ service }: AddressProps) => {
  const [notify, setNotify] = useState(service.notifyOnFail ? 'yes' : 'no');

  useEffect(() => {
    setNotify(service.notifyOnFail ? 'yes' : 'no');
  }, [service.notifyOnFail]);

  const handleSave = () => {
    console.log('NotifyOnFail updated:', notify === 'yes');
  };

  return (
    <>
      <InfoCard setOpen={() => {}} sx={{ mb: 3 }}>
        <Stack direction="column" spacing={{ xs: 2, sm: 1 }}>
          <InfoCardAttribute label="SUB" value={(service.sub || 'N/A').toUpperCase()} />
          <InfoCardAttribute label="UPTIME" value={service.uptime || '-'} />
          <InfoCardAttribute label="MEMORY" value={service.memory || '0'} />
          <InfoCardAttribute label="CPU" value={service.cpu || '0'} />
          <InfoCardAttribute label="THREADS" value={service.threads || '0'} />
          <InfoCardAttribute label="RESTART COUNT" value={service.restart_count || '0'} />
        </Stack>
      </InfoCard>

      <FormControl sx={{ gap: 2 }}>
        <Typography variant="subtitle2" sx={{ fontWeight: 400 }}>
          Get Notified on Service fail?
        </Typography>
        <RadioGroup
          row
          value={notify}
          onChange={(e) => setNotify(e.target.value)}
          aria-labelledby="address-visibility-radio-buttons"
        >
          <FormControlLabel value="no" control={<Radio />} label="No, don't notify me." />
          <FormControlLabel value="yes" control={<Radio />} label="Yes, notify me." />
        </RadioGroup>

        <Button
          variant="contained"
          color="primary"
          sx={{ flexShrink: 0, width: 150, maxWidth: '100%' }}
          onClick={handleSave}
        >
          Save
        </Button>
      </FormControl>
    </>
  );
};

export default Address;
