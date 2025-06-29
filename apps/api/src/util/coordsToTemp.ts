import axios from 'axios';

/**
 * Fetches current temp based upon a given longitude and latitude.
 *
 * Please see the docs for the API used
 * https://open-meteo.com/en/docs
 *
 * @param lat latitude
 * @param long longitude
 * @returns current temperature at location in Celsius
 */

export const coordsToTemp = async (
  lat: number,
  long: number
): Promise<number> => {
  try {
    const response = await axios.get(`https://api.open-meteo.com/v1/forecast`, {
      params: {
        latitude: lat,
        longitude: long,
        current_weather: true,
        timezone: 'auto',
        forecast_days: 1,
      },
      timeout: 5000,
    });

    const temperature = response.data?.current_weather?.temperature;

    if (typeof temperature !== 'number') {
      throw new Error('Temperature data missing or invalid');
    }

    return temperature;
  } catch (error) {
    console.error('Failed to fetch temperature:', error);
    throw error;
  }
};
