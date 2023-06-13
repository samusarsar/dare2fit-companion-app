/* eslint-disable max-len */
import {
  MediaTypeOptions,
  getCameraPermissionsAsync,
  getMediaLibraryPermissionsAsync,
  launchCameraAsync,
  launchImageLibraryAsync,
  requestCameraPermissionsAsync,
  requestMediaLibraryPermissionsAsync,
} from "expo-image-picker";
import {
  Text,
  HStack,
  VStack,
  Heading,
  useColorModeValue,
  Button,
  Badge,
  Avatar,
  Popover,
} from "native-base";
import { FC, ReactElement, useContext, useState } from "react";

import { UserRoles } from "../../../common/enums";
import { AppContext } from "../../../context/AppContext/AppContext";
import { logoutUser } from "../../../services/auth.services";
import { changeAvatar, changeUserRole } from "../../../services/user.services";

const ProfileHeader: FC = (): ReactElement => {
  const { userData, setContext } = useContext(AppContext);

  const [loadingBtn, setLoadingBtn] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

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

  const handleAvatarChange = (type: string) => {
    const getPermissionFn =
      type === "select"
        ? getMediaLibraryPermissionsAsync
        : getCameraPermissionsAsync;

    const requestPermissionFn =
      type === "select"
        ? requestMediaLibraryPermissionsAsync
        : requestCameraPermissionsAsync;

    const launchFn =
      type === "select" ? launchImageLibraryAsync : launchCameraAsync;

    const options = {
      base64: true,
      mediaTypes: MediaTypeOptions.Images,
    };

    getPermissionFn()
      .then((res) => {
        if (!res.granted) {
          return requestPermissionFn();
        }

        return res;
      })
      .then((resRequest) => {
        if (resRequest.granted) {
          launchFn(options).then((res) => {
            if (!res.canceled) {
              fetch(res.assets[0].uri)
                .then((fetchedUri) => fetchedUri.blob())
                .then((blobFile) => changeAvatar(userData!.handle, blobFile));
            }
          });
        } else {
          return null;
        }
      });
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
      <Popover
        isOpen={isOpen}
        onClose={() => setIsOpen(!isOpen)}
        placement="top"
        trigger={(triggerProps) => (
          <Button
            variant="ghost"
            rounded="full"
            {...triggerProps}
            onPress={() => setIsOpen(true)}
          >
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
              <Avatar
                boxSize="120px"
                borderColor={contrastColor}
                borderWidth={2}
              >
                {userData!.handle[0]}
              </Avatar>
            )}
          </Button>
        )}
      >
        <Popover.Content>
          <Popover.Body>
            <Button.Group>
              <Button
                colorScheme="purple"
                variant="subtle"
                onPress={() => {
                  handleAvatarChange("select");
                  setIsOpen(false);
                }}
              >
                Select Image
              </Button>
              <Button
                colorScheme="purple"
                onPress={() => {
                  handleAvatarChange("take");
                  setIsOpen(false);
                }}
              >
                Take Photo
              </Button>
            </Button.Group>
          </Popover.Body>
        </Popover.Content>
      </Popover>
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
