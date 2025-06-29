import { Box, Card, CardHeader, Grid, Typography } from '@mui/material';
import { useWeather } from '../../lib/api';
import { WeatherCard } from './WeatherCard';

export const Weather = () => {
  const { data, isError, isLoading } = useWeather();
  const weatherData = data?.data.data;
  if (isLoading) {
    return (
      <Card>
        <CardHeader title="Contacts" />
      </Card>
    );
  }

  if (isError) {
    return (
      <Card>
        <CardHeader title="Contacts" />
        <Box display="flex" justifyContent="center" alignItems="center">
          <Typography variant="body1" color="error">
            Failed to load weather
          </Typography>
        </Box>
      </Card>
    );
  }

  if (!weatherData?.length) {
    return (
      <Card>
        <CardHeader title="Weather" />
      </Card>
    );
  }

  return (
    <Grid container spacing={2} columns={12}>
      {weatherData?.map((location) => (
        <Grid key={location.location} size={{ xs: 6, sm: 4, lg: 2 }}>
          <WeatherCard
            location={location.location ?? 'Loading...'}
            temp={location.temp?.toString() || 'Unknown'}
          />
        </Grid>
      ))}
    </Grid>
  );
};
