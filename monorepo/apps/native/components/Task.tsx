import { StyleSheet } from "react-native";
import { Button, Text, Card } from "react-native-paper";

const Task = ({
  title,
  startTime,
  endTime,
  onStart,
  onEnd,
  isActive,
  isNext,
}: any) => {
  return (
    <Card style={styles.container}>
      <Card.Content>
        <Card.Title title={title} />
        {isActive ? (
          <>
            <Text variant="displaySmall">Iniciada:</Text>
            <Text style={styles.time}>{startTime?.toISOString()}</Text>
            <Button
              mode="contained"
              buttonColor="#E53935"
              onPress={onEnd}
              style={styles.button}
            >
              Finalizar Tarea
            </Button>
          </>
        ) : (
          <>
            {startTime && (
              <Text style={styles.time}>
                Iniciada: {startTime?.toISOString()}
              </Text>
            )}
            {endTime && (
              <Text style={styles.time}>
                Finalizada: {endTime?.toISOString()}
              </Text>
            )}
            {isNext && (
              <Button mode="contained" onPress={onStart} style={styles.button}>
                Iniciar Tarea
              </Button>
            )}
          </>
        )}
      </Card.Content>
    </Card>
  );
};

export default Task;

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  time: {
    fontSize: 16,
    marginVertical: 8,
  },
  button: {
    marginTop: 16,
  },
});
