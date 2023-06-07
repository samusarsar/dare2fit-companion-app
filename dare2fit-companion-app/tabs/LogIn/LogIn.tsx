import { MaterialIcons } from "@expo/vector-icons";
import {
  Box,
  Button,
  Center,
  FormControl,
  Heading,
  Icon,
  Image,
  Input,
  VStack,
  useColorModeValue,
} from "native-base";
import { useContext, useRef, useState } from "react";
import { Pressable } from "react-native";

import ColorModeSwitch from "../../components/Profile/ColorModeSwitch/ColorModeSwitch";
import { AppContext } from "../../context/AppContext/AppContext";
import { loginUser } from "../../services/auth.services";

const LogIn = () => {
  const { setContext } = useContext(AppContext);

  const [form, setForm] = useState({
    email: "",
    emailError: "",
    password: "",
    passwordError: "",
  });
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);

  const background = useColorModeValue("brand.light", "brand.dark");

  const handleSubmit = () => {
    if (form.email.split("@").length !== 2) {
      setForm({
        ...form,
        emailError: "Invalid email format.",
      });
      return;
    }

    setLoading(true);
    loginUser(form.email, form.password)
      .then((credential) =>
        setContext!({
          user: credential.user,
          userData: null,
        })
      )
      .then(() => {
        setForm({
          ...form,
          emailError: "",
          passwordError: "",
        });
      })
      .catch((e) => {
        switch (e.message) {
          case "Firebase: Error (auth/user-not-found).":
            setForm({
              ...form,
              emailError: "No registered users with this email.",
              passwordError: "",
            });
            break;
          case "Firebase: Error (auth/wrong-password).":
            setForm({
              ...form,
              emailError: "",
              passwordError: "Password incorrect.",
            });
            break;
        }
      })
      .finally(() => setLoading(false));
  };

  return (
    <Center
      w="100%"
      h="100%"
      alignContent="center"
      bg={background}
      position="relative"
    >
      <ColorModeSwitch />
      <Center w="100%">
        <Image
          source={{
            uri: "https://firebasestorage.googleapis.com/v0/b/dare2fit-f6eb4.appspot.com/o/assets%2Flogos%2Fdare2fit-05-circle.png?alt=media&token=c266cfd5-d1be-4e93-91f2-ef7a7f5c9fba&_gl=1*yya3sk*_ga*MjExMzk5MTA5MC4xNjgzMjcwMjg1*_ga_CW55HF8NVT*MTY4NjEyODc2MS44Ni4xLjE2ODYxMjg3NzEuMC4wLjA.",
          }}
          alt="logo"
          size="md"
        />
      </Center>
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
          Sign in to continue!
        </Heading>
        <VStack space={3} mt="5">
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
          <Button
            mt="2"
            colorScheme="purple"
            isLoading={loading}
            onPress={handleSubmit}
          >
            Log in
          </Button>
          {/* <HStack mt="6" justifyContent="center">
            <Text
              fontSize="sm"
              color="coolGray.600"
              _dark={{
                color: "warmGray.200",
              }}
            >
              I'm a new user.{" "}
            </Text>
            <Link
              _text={{
                color: "indigo.500",
                fontWeight: "medium",
                fontSize: "sm",
              }}
              href="#"
            >
              Sign Up
            </Link>
          </HStack> */}
        </VStack>
      </Box>
    </Center>
  );
};

export default LogIn;
