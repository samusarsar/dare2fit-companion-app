/* eslint-disable max-len */
import {
  Text,
  HStack,
  VStack,
  Heading,
  useColorModeValue,
  Button,
  Badge,
  Avatar,
} from "native-base";
import { FC, ReactElement, useContext, useState } from "react";

import { UserRoles } from "../../../common/enums";
import { AppContext } from "../../../context/AppContext/AppContext";
import { logoutUser } from "../../../services/auth.services";
import { changeUserRole } from "../../../services/user.services";

const ProfileHeader: FC = (): ReactElement => {
  const { userData, setContext } = useContext(AppContext);

  const [loadingBtn, setLoadingBtn] = useState(false);

  const contrastColor = useColorModeValue("brand.dark", "brand.light");

  const amAdmin = userData!.role === UserRoles.Admin;
  const amAppliedForAdmin = userData!.role === UserRoles.WantAdmin;

  const handleApplyForAdmin = () => {
    setLoadingBtn(true);
    changeUserRole(userData!.handle, UserRoles.WantAdmin).then(() =>
      setLoadingBtn(false)
    );
  };

  const handleUnapplyForAdmin = () => {
    setLoadingBtn(true);
    changeUserRole(userData!.handle, UserRoles.Base).then(() =>
      setLoadingBtn(false)
    );
  };

  const handleLogOut = () => {
    setLoadingBtn(true);
    logoutUser()
      .then(() =>
        setContext!({
          user: null,
          userData: null,
        })
      )
      .then(() => setLoadingBtn(false));
  };

  return (
    <VStack w="100%" space={2} alignItems="center">
      {userData!.avatarURL ? (
        <Avatar
          source={{ uri: `${userData!.avatarURL}` }}
          boxSize="120px"
          borderColor={contrastColor}
          borderWidth={2}
        >
          {userData!.handle[0]}
        </Avatar>
      ) : (
        <Avatar boxSize="120px" borderColor={contrastColor} borderWidth={2}>
          {userData!.handle[0]}
        </Avatar>
      )}
      <Heading size="md">{`${userData!.firstName} ${
        userData!.lastName
      }`}</Heading>
      <HStack space={2}>
        <Text>@{userData!.handle}</Text>
        <VStack>
          {amAdmin && (
            <Badge colorScheme="purple" size="md">
              Admin
            </Badge>
          )}
        </VStack>
      </HStack>
      {!amAdmin &&
        (!amAppliedForAdmin ? (
          <Button
            colorScheme="teal"
            size="sm"
            w="40%"
            variant="ghost"
            isLoading={loadingBtn}
            onPress={handleApplyForAdmin}
          >
            Apply for Admin
          </Button>
        ) : (
          <Button
            colorScheme="gray"
            variant="outline"
            w="40%"
            isLoading={loadingBtn}
            onPress={handleUnapplyForAdmin}
          >
            Applied for Admin
          </Button>
        ))}
      <Button
        colorScheme="red"
        variant="solid"
        w="40%"
        size="sm"
        isLoading={loadingBtn}
        onPress={handleLogOut}
      >
        Log Out
      </Button>
    </VStack>
  );
};

export default ProfileHeader;
