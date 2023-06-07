import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Button, Icon } from "native-base";
import { FC } from "react";

const NotificationsButton: FC = () => {
  const { navigate } = useNavigation();

  return (
    <Button
      size="lg"
      aria-label="toggle theme"
      variant="solid"
      colorScheme="gray"
      leftIcon={<Icon as={FontAwesome} name="bell-o" />}
      onPress={() => navigate("Notifications")}
    />
  );
};

export default NotificationsButton;
