import { useState } from 'react';
import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Stack,
  Typography,
} from '@mui/material';
import InfoCard from '../common/InfoCard';
import InfoCardAttribute from '../common/InfoCardAttribute';

interface Service {
  name: string;
  cpu?: string;
  uptime?: string;
  threads?: string;
  sub?: string;
  status?: string;
  memory?: string;
  restart_count?: string;
  // add other fields from your API if needed
}

interface AddressProps {
  service: Service; // we receive the service object from PersonalInfoTabPanel
}

const Address = ({ service }: AddressProps) => {
  const [open, setOpen] = useState(false);
  const upSm = true; // or use your breakpoints hook if needed

  const handleClose = () => setOpen(false);

  return (
    <>
      <InfoCard setOpen={setOpen} sx={{ mb: 3 }}>
        <Stack direction="column" spacing={{ xs: 2, sm: 1 }}>
          <InfoCardAttribute label="SUB" value={(service.sub || "N/A").toUpperCase()} />
          <InfoCardAttribute label="UPTIME" value={service.uptime || "-"} />
          <InfoCardAttribute label="MEMORY" value={service.memory || "0"} />
          <InfoCardAttribute label="CPU" value={service.cpu || "0"} />
          <InfoCardAttribute label="THREADS" value={service.threads || "0"} />
          <InfoCardAttribute label="RESTART COUNT" value={service.restart_count || "0"} />
         
        </Stack>
      </InfoCard>

      <FormControl sx={{ gap: 2 }}>
        <Typography variant="subtitle2" sx={{ fontWeight: 400 }}>
          Get Notified on Service fail?
        </Typography>
        <RadioGroup
          row={upSm}
          defaultValue={service.notifyOnFail ? "yes" : "no"}
          aria-labelledby="address-visibility-radio-buttons"
        >
          <FormControlLabel value="no" control={<Radio />} label="No, don't notify me." />
          <FormControlLabel value="yes" control={<Radio />} label="Yes, notify me." />
        </RadioGroup>
      </FormControl>
    </>
  );
};

export default Address;
