import React, { useMemo, useRef, useState } from 'react';
import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridValueFormatter,
} from '@mui/x-data-grid';
import {
  Box,
  Typography,
  Alert,
  CircularProgress,
  Popper,
  Paper,
  ClickAwayListener,
} from '@mui/material';
import {
  Interactions200DataItem,
  useAgents,
  useContacts,
  useInteractions,
} from '../../lib/api';
import {
  countUniqueAgentInteractions,
  formatTime,
  getCustomersAgentHasContacted,
} from './utils';

interface InteractionWithEnhancedData extends Interactions200DataItem {
  total_interactions: number;
}

const DATAGRID_CONFIG = {
  height: 600,
  defaultPageSize: 25,
  pageSizeOptions: [5, 10, 25, { value: -1, label: 'All' }],
} as const;

const LoadingState = () => (
  <Box display="flex" justifyContent="center" alignItems="center" height={200}>
    <CircularProgress size={40} />
    <Typography variant="body1">Loading agent interactions...</Typography>
  </Box>
);

const ErrorState = ({ message }: { message: string }) => (
  <Alert severity="error">{message}</Alert>
);

const EmptyState = () => (
  <Box display="flex" justifyContent="center" alignItems="center" height={200}>
    <Typography variant="body1" color="text.secondary">
      No interactions found
    </Typography>
  </Box>
);

const AgentInteractionsTable = () => {
  const {
    data: interactionsData,
    isLoading: interactionsLoading,
    error: interactionsError,
  } = useInteractions();

  const {
    data: agentsData,
    isLoading: agentsLoading,
    error: agentsError,
  } = useAgents();

  const {
    data: contactsData,
    isLoading: contactsLoading,
    error: contactsError,
  } = useContacts();

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [selectedValue, setSelectedValue] = useState<string | null>(null);
  const cellRef = useRef<HTMLDivElement | null>(null);
  const [selectedRowId] = useState<number | null>(null);

  const handleCellClick = (
    event: React.MouseEvent<HTMLDivElement>,
    value: string
  ) => {
    setAnchorEl(event.currentTarget);
    setSelectedValue(value);
  };

  const columns: GridColDef[] = [
    {
      field: 'created_at',
      headerName: 'Date',
      flex: 1,
      minWidth: 150,
    },
    {
      field: 'agent_name',
      headerName: 'Agent',
      flex: 1,
      minWidth: 120,
    },
    {
      field: 'total_interactions',
      headerName: 'Total Interactions',
      type: 'number',
      flex: 1,
      minWidth: 140,
      align: 'center',
      headerAlign: 'center',
      renderCell: (params: GridRenderCellParams<any, number>) => (
        <Typography
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            '&:hover': {
              cursor: 'pointer',
            },
          }}
          variant="body2"
          ref={params.id === selectedRowId ? cellRef : null}
          onClick={(event) => handleCellClick(event, params.id as string)}
        >
          {params.value}
        </Typography>
      ),
    },
    {
      field: 'length_seconds',
      headerName: 'Length (Hrs)',
      type: 'number',
      flex: 1,
      minWidth: 120,
      align: 'center',
      headerAlign: 'center',
      valueFormatter: ((params) => formatTime(params)) as GridValueFormatter,
    },
  ];

  const interactionCounts = useMemo(() => {
    const interactions = interactionsData?.data?.data;
    return interactions ? countUniqueAgentInteractions(interactions) : {};
  }, [interactionsData?.data?.data]);

  const enhancedInteractions = useMemo((): InteractionWithEnhancedData[] => {
    const interactions = interactionsData?.data?.data;
    if (!interactions) return [];

    return interactions.map((interaction) => ({
      ...interaction,
      total_interactions: interactionCounts[interaction.agent_id || 0] || 0,
      agent_name: agentsData?.data?.data.find(
        (ag) => ag.id === interaction.agent_id
      )?.name,
    }));
  }, [
    interactionsData?.data?.data,
    agentsData?.data?.data,
    contactsData?.data?.data,
    interactionCounts,
  ]);

  const isLoading = interactionsLoading || agentsLoading || contactsLoading;
  const hasError = interactionsError || agentsError || contactsError;
  const isEmpty = enhancedInteractions.length === 0;

  const errorMessage = useMemo(() => {
    if (interactionsError) return 'Failed to load interactions';
    if (agentsError) return 'Failed to load agents';
    if (contactsError) return 'Failed to load contacts';
    return 'An unexpected error occurred';
  }, [interactionsError, agentsError, contactsError]);

  if (isLoading) {
    return <LoadingState />;
  }

  if (hasError) {
    return <ErrorState message={errorMessage} />;
  }

  if (isEmpty) {
    return <EmptyState />;
  }

  const agentsCustomersRecord = getCustomersAgentHasContacted(
    interactionsData?.data?.data || [],
    contactsData?.data?.data || []
  );

  const closeAgentPopup = () => setAnchorEl(null);

  return (
    <>
      <DataGrid
        rows={enhancedInteractions}
        columns={columns}
        pageSizeOptions={DATAGRID_CONFIG.pageSizeOptions}
        pagination
        disableRowSelectionOnClick
        disableColumnMenu
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: DATAGRID_CONFIG.defaultPageSize,
            },
          },
        }}
        slotProps={{
          loadingOverlay: {
            variant: 'linear-progress',
          },
        }}
        sx={{
          height: { xs: '500px', lg: '65vh' },
          backgroundColor: '#0A0F14',
          color: '#fff',
          '& .MuiDataGrid-columnHeaders': {
            backgroundColor: '#11171F',
          },
          '& .MuiDataGrid-cell': {
            color: '#fff',
          },
          '& .MuiDataGrid-footerContainer': {
            backgroundColor: '#11171F',
          },
        }}
      />
      <Popper
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        placement="top-end"
        modifiers={[
          {
            name: 'offset',
            options: {
              offset: [0, 8],
            },
          },
        ]}
      >
        <ClickAwayListener onClickAway={closeAgentPopup}>
          <Paper elevation={3} sx={{ p: '1rem', border: 'solid amber 2px' }}>
            <>
              <Typography variant="h6">Beta</Typography>
              {selectedValue !== null &&
              agentsCustomersRecord[Number(selectedValue)] &&
              agentsCustomersRecord[Number(selectedValue)].length ? (
                agentsCustomersRecord[Number(selectedValue)].map((val, idx) => (
                  <Typography key={idx} marginTop={1}>
                    {val}
                  </Typography>
                ))
              ) : (
                <Typography>Sorry, unable to load data.</Typography>
              )}
            </>
          </Paper>
        </ClickAwayListener>
      </Popper>
    </>
  );
};

export default AgentInteractionsTable;
