import { Center, HStack, useColorModeValue } from "native-base";

import ColorModeSwitch from "../../components/Profile/ColorModeSwitch/ColorModeSwitch";
import NotificationsButton from "../../components/Profile/Notifications/NotificationsButton/NotificationsButton";
import ProfileHeader from "../../components/Profile/ProfileHeader/ProfileHeader";

const Profile = () => {
  const background = useColorModeValue("brand.light", "brand.dark");

  return (
    <Center w="100%" h="100%" p={2} bg={background} position="relative">
      <HStack
        position="absolute"
        top={0}
        justifyContent="flex-end"
        w="100%"
        py={4}
        px={2}
        space={2}
      >
        <NotificationsButton />
        <ColorModeSwitch />
      </HStack>
      <ProfileHeader />
    </Center>
  );
};

export default Profile;
