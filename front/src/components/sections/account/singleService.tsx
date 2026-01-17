import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Stack, Divider, CircularProgress, Typography } from '@mui/material';

import PersonalInfoTabPanel from './personal-info/PersonalInfoTabPanel';

interface Service {
  name: string;
  description?: string;
  // add more fields as your API grows
}

const ServiceDetail = () => {
  const { servicename } = useParams<{ servicename: string }>();
  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!servicename) return;

    fetch(`/api/service/${servicename}`)
      .then(res => res.json())
      .then(data => {
        setService(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [servicename]);

  if (loading) {
    return (
      <Stack alignItems="center" justifyContent="center" height="100%">
        <CircularProgress />
      </Stack>
    );
  }

  if (!service) {
    return <Typography>Service not found</Typography>;
  }

  return (
    <Stack direction="column" divider={<Divider />} spacing={5}>
      <PersonalInfoTabPanel serviceName={service.name} />
    </Stack>
  );
};

export default ServiceDetail;
