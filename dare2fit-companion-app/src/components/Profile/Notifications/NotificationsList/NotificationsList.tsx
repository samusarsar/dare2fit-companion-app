import { Ionicons } from "@expo/vector-icons";
import { Box, VStack, Text, Icon, HStack, Divider } from "native-base";
import { FC, ReactElement, useContext } from "react";

import { AppContext } from "../../../../context/AppContext/AppContext";
import SingleNotification from "../SingleNotification/SingleNotification";

const NotificationsList: FC = (): ReactElement => {
  const { userData } = useContext(AppContext);

  const notifications = userData!.notifications
    ? Object.entries(userData!.notifications)
    : null;

  return (
    <VStack w="100%" justifyContent="flex-start">
      {notifications ? (
        notifications.map(([timestamp, notification]) => {
          let icon: string;
          if (
            notification.includes("friend request") ||
            notification.includes("unfriended you")
          ) {
            icon = "person-outline";
          } else if (notification.includes("competing with you")) {
            icon = "people-outline";
          } else if (notification === "You are now an admin!") {
            icon = "alert-circle-outline";
          } else if (notification === "You have been blocked.") {
            icon = "bag-remove-outline";
          } else {
            icon = "notifications-outline";
          }

          return (
            <Box key={timestamp} w="100%">
              <Box my={4} w="100%">
                <SingleNotification
                  notification={notification}
                  timestamp={timestamp}
                  icon={icon}
                />
              </Box>
              <Divider />
            </Box>
          );
        })
      ) : (
        <HStack
          w="100%"
          space={2}
          alignItems="center"
          justifyContent="center"
          py={4}
        >
          <Icon as={Ionicons} name="notifications-off-outline" size="xl" />
          <Text fontSize="md">Nothing new here...</Text>
        </HStack>
      )}
    </VStack>
  );
};

export default NotificationsList;
