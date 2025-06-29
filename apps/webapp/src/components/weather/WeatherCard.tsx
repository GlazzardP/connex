import { Card, Stack, Typography } from '@mui/material';
import ThermostatIcon from '@mui/icons-material/Thermostat';

interface WeatherCardProps {
  location: string;
  temp: string;
}

export const WeatherCard = ({ location, temp }: WeatherCardProps) => {
  return (
    <Card>
      <Typography
        component="h2"
        variant="subtitle1"
        gutterBottom
        style={{ textTransform: 'capitalize' }}
      >
        {location}
      </Typography>
      <Stack
        direction="row"
        sx={{ justifyContent: 'space-between', alignItems: 'center' }}
      >
        <Typography component="h3" variant="h4">
          {temp}°C
        </Typography>
        <ThermostatIcon />
      </Stack>
    </Card>
  );
};
