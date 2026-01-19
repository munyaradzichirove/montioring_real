import { useState, useEffect } from 'react';
import { Stack, TextField, Typography } from '@mui/material';
import AccountDialog from '../common/AccountDialog';
import InfoCard from '../common/InfoCard';
import InfoCardAttribute from '../common/InfoCardAttribute';
import IconifyIcon from 'components/base/IconifyIcon';

const WhatsappView = ({ value, onChange }) => {
  const [open, setOpen] = useState(false);

  const [whatsappNumber, setWhatsappNumber] = useState(value.whatsappNumber || '');
  const [whatsappId, setWhatsappId] = useState(value.whatsappId || '');
  const [whatsappToken, setWhatsappToken] = useState(value.whatsappToken || '');
  const [templateName, setTemplateName] = useState(value.templateName || '');

  useEffect(() => {
    setWhatsappNumber(value.whatsappNumber || '');
    setWhatsappId(value.whatsappId || '');
    setWhatsappToken(value.whatsappToken || '');
    setTemplateName(value.templateName || '');
  }, [value]);

  const handleConfirm = () => {
    onChange({
      whatsappNumber,
      whatsappId,
      whatsappToken,
      templateName
    });
    setOpen(false);
  };

  const handleDiscard = () => {
    setWhatsappNumber(value.whatsappNumber || '');
    setWhatsappId(value.whatsappId || '');
    setWhatsappToken(value.whatsappToken || '');
    setTemplateName(value.templateName || '');
    setOpen(false);
  };

  return (
    <>
      <InfoCard setOpen={setOpen} sx={{ mb: 2 }}>
        <Stack direction="column" spacing={1}>
          <InfoCardAttribute label="Send to Number" value={whatsappNumber} />
          <InfoCardAttribute label="WhatsApp Id" value={whatsappId} />
        <InfoCardAttribute
          label="WhatsApp Token"
          value={whatsappToken ? '•'.repeat(whatsappToken.length) : ''}
          sx={{ fontSize: 40, letterSpacing: 4 }}
        />

          <InfoCardAttribute label="Template Name" value={templateName} />
        </Stack>
        <IconifyIcon
          icon="material-symbols-light:edit-outline"
          sx={{ fontSize: 20, color: 'neutral.dark', visibility: 'hidden' }}
        />
      </InfoCard>

      <AccountDialog
        title="Whatsapp Configs"
        subtitle="Update your WhatsApp configuration fields."
        open={open}
        handleConfirm={handleConfirm}
        handleDiscard={handleDiscard}
      >
        <Stack direction="column" spacing={1}>
          <TextField
            label="Send to Number"
            value={whatsappNumber}
            onChange={(e) => setWhatsappNumber(e.target.value)}
            fullWidth
          />
          <TextField
            label="WhatsApp Id"
            value={whatsappId}
            onChange={(e) => setWhatsappId(e.target.value)}
            fullWidth
          />
         <TextField
            label="WhatsApp Token"
            type="password"            // <-- this hides the value as dots
            value={whatsappToken}
            onChange={(e) => setWhatsappToken(e.target.value)}
            fullWidth
          />
          <TextField
            label="Template Name"
            value={templateName}
            onChange={(e) => setTemplateName(e.target.value)}
            fullWidth
          />
        </Stack>
      </AccountDialog>

      <Stack spacing={1} sx={{ color: 'info.main' }}>
        <Typography variant="body2">
          Make sure this WhatsApp configuration is correct so notifications are sent properly.
        </Typography>
      </Stack>
    </>
  );
};

export default WhatsappView;
