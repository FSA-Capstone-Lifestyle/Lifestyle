import React, { useState, useEffect } from "react";
import {
  Box,
  Text,
  VStack,
  FormControl,
  Input,
  Link,
  Button,
  HStack,
  Center,
  Image,
  View,
  Icon,
} from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { authenticate, me } from "../store/slices/auth.slice";

function LoginScreen({ navigation }) {
  const [show, setShow] = React.useState(false);
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const [errortext, setErrortext] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    setErrortext("");
  }, []);
  const handleSubmit = async () => {
    const data = await dispatch(
      authenticate({ email: userData.email, password: userData.password })
    );
    if (data.payload === "Invalid username or password") {
      displayErrors("! Invalid username or password");
    } else {
      navigation.replace("AppStack");
    }
  };
  const displayErrors = (error) => {
    //return errortext.map((error,index) =><p key={index}>{error.message}</p>)
    setErrortext(error);
  };

  return (
    <Center w="100%" h="100%" bg="white">
      <Box safeArea p="2" py="8" w="90%" maxW="290">
        <View style={{ alignItems: "center" }}>
          <Image
            alt="description of image"
            source={require("../../assets/logo.png")}
            style={{
              marginLeft: 15,
              width: "80%",
              height: 200,
              resizeMode: "cover",
            }}
          />
        </View>

        <VStack space={3} mt="2">
          <FormControl>
            <FormControl.Label>Email</FormControl.Label>
            <Input
              size="md"
              InputLeftElement={
                <Icon
                  as={<MaterialIcons name="email" />}
                  size={5}
                  ml="2"
                  color="muted.400"
                />
              }
              onChangeText={(e) =>
                setUserData((prevState) => ({ ...prevState, email: e }))
              }
            />
          </FormControl>
          <FormControl>
            <FormControl.Label>Password</FormControl.Label>
            <Input
              size="md"
              type={show ? "text" : "password"}
              on
              InputRightElement={
                <Icon
                  as={
                    <MaterialIcons
                      name={show ? "visibility" : "visibility-off"}
                    />
                  }
                  size={5}
                  mr="2"
                  color="muted.400"
                  onPress={() => setShow(!show)}
                />
              }
              onChangeText={(e) =>
                setUserData((prevState) => ({ ...prevState, password: e }))
              }
            />

            <Link
              _text={{
                fontSize: "xs",
                fontWeight: "500",
                color: "indigo.500",
              }}
              alignSelf="flex-end"
              mt="1"
            >
              Forget Password?
            </Link>
            {errortext !== "" ? (
              <Text style={{ color: "red" }}>{errortext}</Text>
            ) : null}
          </FormControl>

          <Button
            onPress={() => {
              handleSubmit();
            }}
            mt="2"
            colorScheme="purple"
          >
            Sign in
          </Button>
          <HStack mt="6" justifyContent="center">
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
              onPress={() => navigation.navigate("RegisterScreen")}
              _text={{
                color: "indigo.500",
                fontWeight: "medium",
                fontSize: "sm",
              }}
            >
              Sign Up
            </Link>
          </HStack>
        </VStack>
      </Box>
    </Center>
  );
}

export default LoginScreen;
