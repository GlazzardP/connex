import { Box, Grid, Typography } from '@mui/material';
import { Weather } from './Weather';
import { ContactsList } from './Contacts';
import AgentInteractionsTable from './AgentInteractionsTable';

export default function Dashboard() {
  return (
    <Box
      sx={{
        width: '100%',
        height: { xs: 'auto', lg: '100vh' },
        overflow: { xs: 'visible', lg: 'hidden' },
      }}
    >
      <Typography
        component="h1"
        variant="h4"
        gutterBottom
        sx={{
          mb: 2,
          fontWeight: 'bold',
          fontSize: { xs: '1.5rem', md: '2rem' },
        }}
      >
        Connex Dashboard
      </Typography>
      <Grid container spacing={2}>
        <Grid size={12}>
          <Weather />
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <ContactsList />
        </Grid>

        <Grid size={{ xs: 12, md: 8 }}>
          <AgentInteractionsTable />
        </Grid>
      </Grid>
    </Box>
  );
}
