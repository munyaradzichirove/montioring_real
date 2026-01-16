import { RefObject, useMemo } from 'react';

import Box from '@mui/material/Box';
import Chip, { ChipOwnProps } from '@mui/material/Chip';
import Link from '@mui/material/Link';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import {
  DataGrid,
  GRID_CHECKBOX_SELECTION_COL_DEF,
  GridColDef,
  GridRenderCellParams,
} from '@mui/x-data-grid';
import { GridApiCommunity } from '@mui/x-data-grid/internals';
import { users } from 'data/users';
import dayjs from 'dayjs';
import { User } from 'types/users';
import DashboardMenu from 'components/common/DashboardMenu';
import DataGridPagination from 'components/pagination/DataGridPagination';
import { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface UsersTableProps {
  apiRef: RefObject<GridApiCommunity | null>;
  filterButtonEl: HTMLButtonElement | null;
}
interface Service {
  name: string;
  status: string;
  sub: string;
  cpu?: number;
  memory?: number;
  threads?: number;
  uptime: string;
  restart_count: number;
}

const useServices = () => {
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/services') // your Flask endpoint
      .then(res => res.json())
      .then(data => setServices(data))
      .catch(console.error);
  }, []);

  return services;
};


const getStatusChipColor = (value: User['status']): ChipOwnProps['color'] => {
 
  switch (value) {
    case 'active':
      return 'success';
    case 'inactive':
      return 'error';
    case 'away':
      return 'warning';
    default:
      return 'neutral';
  }
};

const UsersTable = ({ apiRef, filterButtonEl }: UsersTableProps) => {
  const navigate = useNavigate();
  const services = useServices();
  const serviceRows = services.map((svc, idx) => ({
  id: idx,              // DataGrid needs a unique id
  name: svc.name,
  status: svc.status,
  uptime: svc.uptime,
  restart_count: svc.restart_count,
  cpu: svc.cpu,
  memory: svc.memory,
  threads: svc.threads,
  createdAt: new Date(), // Placeholder date
}));
  console.log('Services:', services);
  const columns: GridColDef<User>[] = useMemo(
    () => [
      {
        ...GRID_CHECKBOX_SELECTION_COL_DEF,
        width: 64,
      },
     
      {
        field: 'name',
        headerName: 'Name',
        minWidth: 200
      },
      {
        field: 'status',
        headerName: 'Status',
        width: 100,
        align: 'center',
        headerAlign: 'center',
        renderCell: (params: GridRenderCellParams<User>) => (
          <Chip
            label={params.row.status}
            color={getStatusChipColor(params.row.status)}
            sx={{
              textTransform: 'capitalize',
            }}
          />
        ),
      },
   
      {
        field: 'uptime',
        headerName: 'Uptime',
        width: 250,
      },
      {
        field: 'threads',
        headerName: 'Threads Count',
        width: 160,
        sortable: false,
        filterable: false,
      },
        {
        field: 'cpu',
        headerName: 'CPU (%)',
        width: 160,
        sortable: false,
        filterable: false,
      },
      
       {
        field: 'memory',
        headerName: 'Memory (%)',
        width: 160,
        sortable: false,
        filterable: false,
      },
      {
      field: 'action',
      headerName: 'Action',
      filterable: false,
      sortable: false,
      width: 100,
      align: 'right',
      headerAlign: 'right',
      renderCell: (params) => (
        <Button
          sx={{ ml: 5 }} // ← adds left margin
          size="small"
          variant="contained"
          onClick={() => navigate(`/service-detail/${params.row.name}`)}
        >
          View
        </Button>
      ),
    }


    
    
    ],
    [],
  );

  return (
    <Box sx={{ width: 1 }}>
      <DataGrid
        rowHeight={64}
        rows={serviceRows}
        apiRef={apiRef}
        columns={columns}
        pageSizeOptions={[8]}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 8,
            },
          },
        }}
        checkboxSelection
        slots={{
          basePagination: (props) => <DataGridPagination showFullPagination {...props} />,
        }}
        slotProps={{
          panel: {
            target: filterButtonEl,
          },
        }}
      />
    </Box>
  );
};

export default UsersTable;
