import React, { useEffect, useState } from "react";
import {
  Box,
  Text,
  Heading,
  VStack,
  WarningOutlineIcon,
  FormControl,
  Input,
  Link,
  Button,
  HStack,
  Center,
  Image,
  View,
  Icon,
  Form,
} from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { register, me } from "../store/slices/auth.slice";
function RegisterScreen() {
  const [show, setShow] = React.useState(false);
  const [errortext, setErrortext] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(me());
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const firstName = event.target.firstName.value;
    const lastName = event.target.lastName.value;
    const email = event.target.email.value;
    const password = event.target.password.value;
    dispatch(register({ firstName, lastName, email, password }));
  };

  const displayErrors = () => {
    //return errortext.map((error,index) =><p key={index}>{error.message}</p>)
  };
  return (
    <Center w="100%">
      <Box safeArea p="2" w="90%" maxW="290" py="8">
        <Heading
          size="lg"
          color="coolGray.800"
          _dark={{
            color: "warmGray.50",
          }}
          fontWeight="semibold"
        >
          Welcome
        </Heading>
        <Heading
          mt="1"
          color="coolGray.600"
          _dark={{
            color: "warmGray.200",
          }}
          fontWeight="medium"
          size="xs"
        >
          Sign up to continue!
        </Heading>
        <VStack space={3} mt="5">
          <Form onSubmit={handleSubmit}>
            <FormControl>
              <FormControl.Label>First Name</FormControl.Label>
              <Input
                size="md"
                InputLeftElement={
                  <Icon
                    as={<MaterialIcons name="firstName" />}
                    size={5}
                    ml="2"
                    color="muted.400"
                  />
                }
                name="firstName"
              />
            </FormControl>
            <FormControl>
              <FormControl.Label>Last Name</FormControl.Label>
              <Input
                size="md"
                InputLeftElement={
                  <Icon
                    as={<MaterialIcons name="lastName" />}
                    size={5}
                    ml="2"
                    color="muted.400"
                  />
                }
                name="lastName"
              />
            </FormControl>
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
                name="email"
              />
            </FormControl>
            <FormControl>
              <FormControl.Label>Password</FormControl.Label>
              <Input
                size="md"
                type={show ? "text" : "password"}
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
                name="password"
              />
            </FormControl>
            <FormControl>
              <FormControl.Label>Confirm Password</FormControl.Label>
              <Input
                size="md"
                type={show ? "text" : "password"}
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
                name="password"
              />
            </FormControl>
            <Button type="submit" mt="2" colorScheme="indigo">
              Sign up
            </Button>
          </Form>
        </VStack>
      </Box>
    </Center>
  );
}

export default RegisterScreen;
