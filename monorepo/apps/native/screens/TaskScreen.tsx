import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import Header from "../components/Header";
import Task from "../components/Task";

type ITask = {
  title: string;
  estimatedDuration: number;
  startTime: Date | null;
  endTime: Date | null;
};

// mocked tasks
const TASKS: ITask[] = [
  {
    title: "Limpiarse las manos",
    estimatedDuration: 5000, // in milliseconds
    startTime: null,
    endTime: null,
  },
  {
    title: "Preparar material",
    estimatedDuration: 30000, // in milliseconds
    startTime: null,
    endTime: null,
  },
  {
    title: "Vestirse",
    estimatedDuration: 70000, // in milliseconds
    startTime: null,
    endTime: null,
  },
];

const TaskScreen = () => {
  const [activeTask, setActiveTask] = useState<string>("");

  const handleStart = (title: string) => {
    if (activeTask) {
      handleFinish(activeTask);
    }
    setActiveTask(title);
    // mock saving the start time
    TASKS[
      TASKS.findIndex(({ title: tasksTitle }) => title === tasksTitle)
    ].startTime = new Date();
  };

  const handleFinish = (title: string) => {
    setActiveTask("");
    TASKS[
      TASKS.findIndex(({ title: tasksTitle }) => title === tasksTitle)
    ].endTime = new Date();
  };

  return (
    <>
      <Header title="Dr. Garcia, cirujano" />
      <View style={styles.container}>
        {TASKS.map(({ title, startTime, endTime }, i) => (
          <Task
            isActive={activeTask === title}
            isFinished={!!(startTime && endTime)}
            isNext={i === TASKS.findIndex(({ startTime }) => !startTime)}
            title={title}
            startTime={startTime}
            endTime={endTime}
            key={i}
            onStart={() => handleStart(title)}
            onEnd={() => handleFinish(title)}
          />
        ))}
      </View>
    </>
  );
};

export default TaskScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#F5F5F5",
  },
  time: {
    fontSize: 16,
    marginVertical: 8,
  },
  button: {
    marginTop: 16,
  },
});
