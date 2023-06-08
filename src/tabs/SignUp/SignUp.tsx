import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import {
  Box,
  Button,
  Center,
  FormControl,
  HStack,
  Heading,
  Icon,
  Image,
  Input,
  Text,
  VStack,
  useColorModeValue,
} from "native-base";
import { useContext, useState } from "react";
import { Pressable } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SafeAreaView } from "react-native-safe-area-context";

import {
  COLOR_BRAND_DARK,
  COLOR_BRAND_LIGHT,
  FIRST_NAME_MAX_LENGTH,
  FIRST_NAME_MIN_LENGTH,
  LAST_NAME_MAX_LENGTH,
  LAST_NAME_MIN_LENGTH,
  TELEPHONE_LENGTH,
  USERNAME_MAX_LENGTH,
  USERNAME_MIN_LENGTH,
} from "../../common/constants";
import ColorModeSwitch from "../../components/Profile/ColorModeSwitch/ColorModeSwitch";
import { AppContext } from "../../context/AppContext/AppContext";
import { registerUser } from "../../services/auth.services";
import {
  createUser,
  getUserByHandle,
  getUserByTelephone,
} from "../../services/user.services";

const SignUp = () => {
  const { setContext } = useContext(AppContext);

  const [form, setForm] = useState({
    username: "",
    usernameError: "",
    email: "",
    emailError: "",
    password: "",
    passwordError: "",
    firstName: "",
    firstNameError: "",
    lastName: "",
    lastNameError: "",
    telephone: "",
    telephoneError: "",
  });
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);

  const background = useColorModeValue(COLOR_BRAND_LIGHT, COLOR_BRAND_DARK);

  const { navigate } = useNavigation();

  const handleSubmit = () => {
    setForm({
      ...form,
      usernameError:
        form.username.length < USERNAME_MIN_LENGTH ||
        form.username.length > USERNAME_MAX_LENGTH
          ? "Username must be between 2 and 20 characters."
          : "",
      emailError:
        form.email.split("@").length !== 2 ? "Invalid email format." : "",
      firstNameError:
        form.firstName.length < FIRST_NAME_MIN_LENGTH ||
        form.firstName.length > FIRST_NAME_MAX_LENGTH
          ? "First name must be between 3 and 32 characters."
          : "",
      lastNameError:
        form.lastName.length < LAST_NAME_MIN_LENGTH ||
        form.lastName.length > LAST_NAME_MAX_LENGTH
          ? "Last name must be between 3 and 32 characters."
          : "",
      telephoneError:
        form.telephone.length !== TELEPHONE_LENGTH ||
        form.telephone.split("").some((el) => isNaN(+el))
          ? "Telephone must be valid and 10 digits long."
          : "",
    });

    if (
      form.email.split("@").length === 2 &&
      !(
        form.firstName.length < FIRST_NAME_MIN_LENGTH ||
        form.firstName.length > FIRST_NAME_MAX_LENGTH
      ) &&
      !(
        form.lastName.length < LAST_NAME_MIN_LENGTH ||
        form.lastName.length > LAST_NAME_MAX_LENGTH
      ) &&
      !(
        form.telephone.length !== TELEPHONE_LENGTH ||
        form.telephone.split("").some((el) => isNaN(+el))
      )
    ) {
      setLoading(true);
      getUserByHandle(form.username)
        .catch(() => {
          setForm({
            ...form,
            usernameError: "",
          });

          return getUserByTelephone(form.telephone)
            .catch(() => {
              setForm({
                ...form,
                telephoneError: "",
              });

              return registerUser(form.email, form.password)
                .then((credential) => {
                  return createUser(
                    form.username,
                    credential.user.uid,
                    form.email,
                    form.telephone,
                    form.firstName,
                    form.lastName
                  ).then(() =>
                    setContext!((prevState) => ({
                      ...prevState,
                      user: credential.user,
                    }))
                  );
                })
                .then(() => {
                  setForm({
                    ...form,
                    emailError: "",
                  });
                });
            })
            .then((result) => {
              if (result) {
                throw new Error(`Telephone already in use!`);
              }
            });
        })
        .then((result) => {
          if (result) {
            throw new Error(`Username has already been taken!`);
          }
        })
        .catch((e) => {
          switch (e.message) {
            case "Firebase: Error (auth/email-already-in-use).":
              setForm({
                ...form,
                emailError: "Email is already in use!",
              });
              break;
            case `Username has already been taken!`:
              setForm({
                ...form,
                usernameError: "Username has already been taken!",
              });
              break;
            case `Telephone already in use!`:
              setForm({
                ...form,
                telephoneError: "Telephone already in use!",
              });
              break;
          }
        })
        .finally(() => setLoading(false));
    }
  };

  return (
    <Box bg={background} style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <KeyboardAwareScrollView>
          <HStack
            position="absolute"
            justifyContent="flex-end"
            w="100%"
            py={4}
            px={2}
            zIndex={2}
          >
            <ColorModeSwitch />
          </HStack>
          <Center
            w="100%"
            h="100%"
            alignItems="center"
            position="relative"
            py={8}
          >
            <Image
              source={{
                uri: "https://firebasestorage.googleapis.com/v0/b/dare2fit-f6eb4.appspot.com/o/assets%2Flogos%2Fdare2fit-05-circle.png?alt=media&token=c266cfd5-d1be-4e93-91f2-ef7a7f5c9fba&_gl=1*yya3sk*_ga*MjExMzk5MTA5MC4xNjgzMjcwMjg1*_ga_CW55HF8NVT*MTY4NjEyODc2MS44Ni4xLjE2ODYxMjg3NzEuMC4wLjA.",
              }}
              alt="logo"
              size="md"
            />
            <Box safeArea p="2" w="90%" maxW="290">
              <Heading size="lg" fontWeight="600" color="brand.purple">
                Welcome to dare2fit!
              </Heading>
              <Heading
                mt="1"
                _dark={{
                  color: "warmGray.200",
                }}
                color="coolGray.600"
                fontWeight="medium"
                size="xs"
              >
                Sign up to continue!
              </Heading>
              <VStack space={3} mt="5">
                <FormControl isInvalid={!!form.usernameError}>
                  <FormControl.Label>Username</FormControl.Label>
                  <Input
                    onChangeText={(e) =>
                      setForm({
                        ...form,
                        username: e,
                      })
                    }
                  />
                  <FormControl.ErrorMessage>
                    {form.usernameError}
                  </FormControl.ErrorMessage>
                </FormControl>
                <FormControl isInvalid={!!form.emailError}>
                  <FormControl.Label>Email</FormControl.Label>
                  <Input
                    onChangeText={(e) =>
                      setForm({
                        ...form,
                        email: e,
                      })
                    }
                  />
                  <FormControl.ErrorMessage>
                    {form.emailError}
                  </FormControl.ErrorMessage>
                </FormControl>
                <FormControl isInvalid={!!form.passwordError}>
                  <FormControl.Label>Password</FormControl.Label>
                  <Input
                    type={show ? "text" : "password"}
                    InputRightElement={
                      <Pressable onPress={() => setShow(!show)}>
                        <Icon
                          as={
                            <MaterialIcons
                              name={show ? "visibility" : "visibility-off"}
                            />
                          }
                          size={5}
                          mr="2"
                          color="muted.400"
                        />
                      </Pressable>
                    }
                    placeholder="Password"
                    onChangeText={(p) =>
                      setForm({
                        ...form,
                        password: p,
                      })
                    }
                  />
                  <FormControl.ErrorMessage>
                    {form.passwordError}
                  </FormControl.ErrorMessage>
                </FormControl>
                <FormControl isInvalid={!!form.firstNameError}>
                  <FormControl.Label>First Name</FormControl.Label>
                  <Input
                    onChangeText={(e) =>
                      setForm({
                        ...form,
                        firstName: e,
                      })
                    }
                  />
                  <FormControl.ErrorMessage>
                    {form.firstNameError}
                  </FormControl.ErrorMessage>
                </FormControl>
                <FormControl isInvalid={!!form.lastNameError}>
                  <FormControl.Label>Last Name</FormControl.Label>
                  <Input
                    onChangeText={(e) =>
                      setForm({
                        ...form,
                        lastName: e,
                      })
                    }
                  />
                  <FormControl.ErrorMessage>
                    {form.lastNameError}
                  </FormControl.ErrorMessage>
                </FormControl>
                <FormControl isInvalid={!!form.telephoneError}>
                  <FormControl.Label>Telephone</FormControl.Label>
                  <Input
                    onChangeText={(e) =>
                      setForm({
                        ...form,
                        telephone: e,
                      })
                    }
                  />
                  <FormControl.ErrorMessage>
                    {form.telephoneError}
                  </FormControl.ErrorMessage>
                </FormControl>
                <Button
                  mt="2"
                  colorScheme="purple"
                  isLoading={loading}
                  onPress={handleSubmit}
                >
                  Sign Up
                </Button>
                <HStack mt="6" justifyContent="center" alignItems="center">
                  <Text fontSize="sm">Already a member?</Text>
                  <Button
                    variant="link"
                    colorScheme="purple"
                    onPress={() => navigate("LogIn")}
                  >
                    Log In
                  </Button>
                </HStack>
              </VStack>
            </Box>
          </Center>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    </Box>
  );
};

export default SignUp;
