import { Provider as PaperProvider } from "react-native-paper";
import TaskScreen from "./screens/TaskScreen";

export default function App() {
  return (
    <PaperProvider>
      <TaskScreen />
    </PaperProvider>
  );
}
