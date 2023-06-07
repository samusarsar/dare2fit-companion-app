import { Center, ScrollView, useColorModeValue } from "native-base";

import NotificationsList from "../../components/Profile/Notifications/NotificationsList/NotificationsList";

const Notifications = () => {
  const background = useColorModeValue("brand.light", "brand.dark");

  return (
    <ScrollView w="100%" h="100%" bg={background}>
      <Center w="100%" h="100%" p={2}>
        <NotificationsList />
      </Center>
    </ScrollView>
  );
};

export default Notifications;
