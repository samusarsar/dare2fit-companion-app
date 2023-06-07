import { Ionicons } from "@expo/vector-icons";
import { Icon, HStack, Text, IconButton } from "native-base";
import { FC, ReactElement, useContext } from "react";

import { AppContext } from "../../../../context/AppContext/AppContext";
import { removeNotification } from "../../../../services/notification.services";

const SingleNotification: FC<{
  notification: string;
  timestamp?: string;
  icon: string;
}> = ({ notification, timestamp, icon }): ReactElement => {
  const { userData } = useContext(AppContext);

  const handleRemove = () => {
    removeNotification(userData!.handle, timestamp!);
  };

  return (
    <HStack
      w="100%"
      space={2}
      alignItems="center"
      justifyContent="space-between"
      px={2}
    >
      <Icon as={Ionicons} name={icon} size="xl" />
      <Text fontSize="md" w="75%">
        {notification}
      </Text>
      {timestamp && (
        <IconButton
          size="sm"
          variant="solid"
          _icon={{ as: Ionicons, name: "close-outline" }}
          colorScheme="gray"
          aria-label="remove notification"
          onPress={handleRemove}
        />
      )}
    </HStack>
  );
};

export default SingleNotification;
