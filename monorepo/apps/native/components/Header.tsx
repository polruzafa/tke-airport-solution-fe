import { StyleSheet } from "react-native";
import { Appbar } from "react-native-paper";

interface HeaderProps {
  title: string;
  onBack?: () => void;
}

const Header = ({ title, onBack }: HeaderProps) => {
  return (
    <Appbar.Header elevated style={styles.container} dark>
      {onBack && <Appbar.BackAction onPress={onBack} />}
      <Appbar.Content title={title} />
      <Appbar.Action icon="wifi-strength-1-alert" onPress={() => {}} />
    </Appbar.Header>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#018786",
  },
});
