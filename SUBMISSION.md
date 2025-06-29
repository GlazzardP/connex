# Submission

### UI

- **DataTable Component**: Added to improve data display and user interaction with tabular data. -**Beta Customer/Agent**: See which customers the agent spoke to.
- **WeatherCards**: Implemented to visually present weather information in a concise and user-friendly format.
- **Contact Search**: Added a search function for contact list
- **Responsive**: The webapp came already responsive, however, I have tried to reorganise to make it a slightly clearer.
- **Added ENVs**: API env added

### API & DB

I had some difficulty with restarting the api so I was rather cautious in making changes.

- **No Null**: Refused null values in Sequelize Models to ensure more control (I would like to have reflected this in TS types)
- **String restrictions**: Giving (255) to restrict size of strings
- **Updated Weather API**: Updated api call
- **Added ENVs**: PORT env added

### Docker and Testing

I attempted to dockerize both the ui and api, as well as add unit tests. However, I had difficulties configuring these environments and reprioritised when I became stuck. I decided to prioritise delivering meaningful user functionality instead.

### Future Improvements

With more time, I would:

- Break the code down further to improve organisation and readability.
- Update and refine TypeScript types.  
  (I left this for now as Orval is new to me, and I felt time would be better spent elsewhere.)
- Get tests and Docker working
- Remove beta flag from additional agent/customer feature
