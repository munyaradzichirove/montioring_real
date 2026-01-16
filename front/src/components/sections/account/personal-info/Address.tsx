import { useState } from 'react';
import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { countries } from 'data/countries';
import { useAccounts } from 'providers/AccountsProvider';
import { useBreakpoints } from 'providers/BreakpointsProvider';
import IconifyIcon from 'components/base/IconifyIcon';
import CountrySelect from 'components/common/CountrySelect';
import AccountDialog from '../common/AccountDialog';
import InfoCard from '../common/InfoCard';
import InfoCardAttribute from '../common/InfoCardAttribute';

const Address = () => {
  const [open, setOpen] = useState(false);
  const { personalInfo } = useAccounts();
  const { up } = useBreakpoints();
  const upSm = up('sm');

  const handleClose = () => setOpen(false);

  return (
    <>
      <InfoCard setOpen={setOpen} sx={{ mb: 3 }}>
        <Stack direction="column" spacing={{ xs: 2, sm: 1 }}>
          <InfoCardAttribute label="Country" value={personalInfo.country} />
          <InfoCardAttribute label="State" value={personalInfo.state} />
          <InfoCardAttribute label="City" value={personalInfo.city} />
          <InfoCardAttribute label="Street" value={personalInfo.street} />
          <InfoCardAttribute label="ZIP" value={personalInfo.zip} />
        </Stack>
      </InfoCard>

      <FormControl sx={{ gap: 2 }}>
        <Typography variant="subtitle2" sx={{ fontWeight: 400 }}>
          Get Notified on Service fail?
        </Typography>
        <RadioGroup
          row={upSm}
          defaultValue="No,do not notify me"
          aria-labelledby="address-visibility-radio-buttons"
        >
          <FormControlLabel value="no" control={<Radio />} label="No, d'ont notify me." />
          <FormControlLabel value="yes" control={<Radio />} label="Yes, notify me." />
        </RadioGroup>
      </FormControl>
    </>
  );
};

export default Address;
