import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Badge, Box, Button, Icon } from "native-base";
import { FC, useContext } from "react";

import { AppContext } from "../../../../context/AppContext/AppContext";

const NotificationsButton: FC = () => {
  const { userData } = useContext(AppContext);

  const { navigate } = useNavigation();

  const notifications = userData!.notifications
    ? Object.keys(userData!.notifications)
    : null;

  return (
    <Box position="relative">
      <Button
        size="lg"
        aria-label="toggle theme"
        variant="solid"
        colorScheme="gray"
        leftIcon={<Icon as={FontAwesome} name="bell-o" />}
        onPress={() => navigate("Notifications")}
      />
      {notifications && (
        <Badge
          position="absolute"
          bottom={-10}
          right={-5}
          colorScheme="pink"
          p={1}
          py={0}
        >
          {notifications.length}
        </Badge>
      )}
    </Box>
  );
};

export default NotificationsButton;
