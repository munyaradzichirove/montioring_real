import { Divider, Stack, Typography } from '@mui/material';
import AccountTabPanelSection from '../common/AccountTabPanelSection';
import { useEffect, useState } from 'react';

interface LogsTabPanelProps {
  serviceName: string;
}

const LogsTabPanel = ({ serviceName }: LogsTabPanelProps) => {
  const [logs, setLogs] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!serviceName) return;

    fetch(`http://localhost:5000/api/service/${serviceName}/logs`)
      .then(res => res.json())
      .then(data => {
        setLogs(data.logs || []);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching logs for", serviceName, err);
        setLoading(false);
      });
  }, [serviceName]);

  if (loading) return <div>Loading logs...</div>;
  if (!logs.length) return <div>No logs found</div>;

  return (
    <Stack direction="column" divider={<Divider />} spacing={3}>
      <AccountTabPanelSection
        title={`Logs for ${serviceName}`}
        subtitle="Recent service activity"
        icon="material-symbols:receipt-long-outline"
      >
        <Stack direction="column" spacing={1}>
          {logs.map((line, idx) => (
            <Typography key={idx} sx={{ fontFamily: 'monospace', fontSize: 13 }}>
              {line}
            </Typography>
          ))}
        </Stack>
      </AccountTabPanelSection>
    </Stack>
  );
};

export default LogsTabPanel;
