import { Center, Spacer, useColorModeValue } from "native-base";

import ColorModeSwitch from "../../components/Profile/ColorModeSwitch/ColorModeSwitch";
import ProfileHeader from "../../components/Profile/ProfileHeader/ProfileHeader";

const Profile = () => {
  const background = useColorModeValue("brand.light", "brand.dark");

  return (
    <Center w="100%" h="100%" p={2} bg={background} position="relative">
      <ColorModeSwitch />
      <ProfileHeader />
    </Center>
  );
};

export default Profile;
