import { Box, Grid } from "@mui/material";

import Header from "./components/Header";
import Room from "./components/Room";
import { useRooms } from "./hooks/useRooms";
import { useSignalStrength } from "./hooks/useSignalStrength";

const App = () => {
  const { loading, rooms } = useRooms();
  const signalStrength = useSignalStrength();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Header
        title="Dr. Pérez, gerente Planta 1"
        signalStrength={signalStrength}
      />

      <Box sx={{ padding: 3 }}>
        {loading ? (
          <h1>Loading...</h1>
        ) : (
          <Grid container spacing={3}>
            {rooms.map(({ name, tasks, id }) => (
              <Room key={id} name={name} tasks={tasks} />
            ))}
          </Grid>
        )}
      </Box>
    </Box>
  );
};

export default App;
