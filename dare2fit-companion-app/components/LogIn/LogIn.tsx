import { MaterialIcons } from "@expo/vector-icons";
import {
  Box,
  Button,
  Center,
  FormControl,
  HStack,
  Heading,
  Icon,
  Input,
  Link,
  Text,
  VStack,
} from "native-base";
import { useContext, useRef, useState } from "react";
import { Pressable } from "react-native";

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
    <Center w="100%" h="100%" alignContent="center">
      <Box safeArea p="2" py="8" w="90%" maxW="290">
        <Heading
          size="lg"
          fontWeight="600"
          color="brand.purple"
          _dark={{
            color: "warmGray.50",
          }}
        >
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
