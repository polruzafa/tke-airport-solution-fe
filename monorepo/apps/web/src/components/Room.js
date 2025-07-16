import { Typography, Paper, List, Grid } from "@mui/material";

import Task from "./Task";

const Room = ({ name, tasks }) => (
  <Grid item xs={12} md={4}>
    <Paper elevation={3} sx={{ padding: 2 }}>
      <Typography variant="h6" gutterBottom>
        {name}
      </Typography>
      <List>
        {tasks.map(({ title, startTime, endTime }, index) => (
          <Task
            title={title}
            startTime={startTime}
            endTime={endTime}
            key={index}
          />
        ))}
      </List>
    </Paper>
  </Grid>
);

export default Room;
