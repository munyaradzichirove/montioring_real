import { Divider, Stack } from '@mui/material';
import AccountTabPanelSection from '../common/AccountTabPanelSection';
import Address from './Address';
import UserName from './UserName';
import { useEffect, useState } from 'react';

interface Service {
  name: string;
  description?: string;
  // add more fields if needed
}

interface PersonalInfoTabPanelProps {
  serviceName: string; // pass from route
}

const PersonalInfoTabPanel = ({ serviceName }: PersonalInfoTabPanelProps) => {
  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!serviceName) return;

      fetch(`http://localhost:5000/api/service/${serviceName}`)
      .then(res => res.json())
      .then(data => {
        setService(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("error bro"+serviceName+err);
        setLoading(false);
      });
  }, [serviceName]);

  if (loading) return <div>Loading service info...</div>;
  if (!service) return <div>Service not found</div>;

  return (
    <Stack direction="column" divider={<Divider />} spacing={5}>
      <AccountTabPanelSection
        title={service.name} // ← now dynamic from backend
        subtitle="Edit your name here if you wish to make any changes."
        icon="material-symbols:badge-outline"
      >
        <Stack direction="column" spacing={1}>
          <UserName service={service} />
        </Stack>
      </AccountTabPanelSection>

      <AccountTabPanelSection
        title="Service Information"
        subtitle="You  can edit your address and control who can see it."
        icon="material-symbols:info-outline"
      >
        <Address service={service} />
      </AccountTabPanelSection>
    </Stack>
  );
};

export default PersonalInfoTabPanel;
