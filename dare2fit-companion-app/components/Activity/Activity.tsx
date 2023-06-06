import { Button, Center, Text } from "native-base";
import { logoutUser } from "../../services/auth.services";

const ActivityLogger = () => {
    return (
    <Center w="100%" h="100%" alignContent="center">
        <Text>Logged in.</Text>
        <Button onPress={logoutUser}>Log out.</Button>
    </Center>
    );
};

export default ActivityLogger;
