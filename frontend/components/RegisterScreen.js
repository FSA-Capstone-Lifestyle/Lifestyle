import React, { useState } from "react";
import {
  Box,
  Heading,
  VStack,
  FormControl,
  Input,
  Button,
  Center,
  Icon,
} from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { FontAwesome } from "@expo/vector-icons";
import { register } from "../store/slices/auth.slice";

function RegisterScreen({ navigation }) {
  const [show, setShow] = React.useState(false);
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const [formData, setData] = React.useState({});

  const validate = () => {
    setErrors({});

    if (formData.firstName === undefined) {
      setErrors({ ...errors, firstName: "firstName is required" });
      return false;
    } else if (formData.lastName === undefined) {
      setErrors({ ...errors, lastName: "lastName is required" });
      return false;
    } else if (
      !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(formData.email)
    ) {
      setErrors({
        ...errors,
        email: "You have entered an invalid email address!",
      });
      return false;
    } else if (formData.password !== formData.confirmPassword) {
      setErrors({ ...errors, confirmPassword: "Passwords should match !" });
      return false;
    }

    return true;
  };

  const onSubmit = () => {
    if (validate()) {
      dispatch(register(formData)).then((value) =>
        value.meta.requestStatus === "fulfilled"
          ? navigation.navigate("LoginScreen")
          : console.log("rejected")
      );
    } else {
      console.log("Validation Failed");
    }
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
          <FormControl isInvalid={"firstName" in errors}>
            <FormControl.Label>First Name</FormControl.Label>
            <Input
              size="sm"
              InputLeftElement={
                <Icon
                  as={<FontAwesome name="user-o" size={24} color="black" />}
                  size={5}
                  ml="2"
                  color="muted.400"
                />
              }
              onChangeText={(value) =>
                setData({ ...formData, firstName: value })
              }
            />
            {"firstName" in errors ? (
              <FormControl.ErrorMessage>
                {errors.firstName}
              </FormControl.ErrorMessage>
            ) : null}
          </FormControl>
          <FormControl isInvalid={"lastName" in errors}>
            <FormControl.Label>Last Name</FormControl.Label>
            <Input
              size="sm"
              InputLeftElement={
                <Icon
                  as={<FontAwesome name="user-o" size={24} color="black" />}
                  size={5}
                  ml="2"
                  color="muted.400"
                />
              }
              onChangeText={(value) =>
                setData({ ...formData, lastName: value })
              }
            />
            {"lastName" in errors ? (
              <FormControl.ErrorMessage>
                {errors.lastName}
              </FormControl.ErrorMessage>
            ) : null}
          </FormControl>
          <FormControl isInvalid={"email" in errors}>
            <FormControl.Label>Email</FormControl.Label>
            <Input
              size="sm"
              InputLeftElement={
                <Icon
                  as={<MaterialIcons name="email" />}
                  size={5}
                  ml="2"
                  color="muted.400"
                />
              }
              onChangeText={(value) => setData({ ...formData, email: value })}
            />
            {"email" in errors ? (
              <FormControl.ErrorMessage>
                {errors.email}
              </FormControl.ErrorMessage>
            ) : null}
          </FormControl>
          <FormControl>
            <FormControl.Label>Password</FormControl.Label>
            <Input
              size="sm"
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
              onChangeText={(value) =>
                setData({ ...formData, password: value })
              }
            />
          </FormControl>
          <FormControl isInvalid={"confirmPassword" in errors}>
            <FormControl.Label>Confirm Password</FormControl.Label>
            <Input
              size="sm"
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
              onChangeText={(value) =>
                setData({ ...formData, confirmPassword: value })
              }
            />
            {"confirmPassword" in errors ? (
              <FormControl.ErrorMessage>
                {errors.confirmPassword}
              </FormControl.ErrorMessage>
            ) : null}
          </FormControl>
          <Button mt="2" colorScheme="purple" onPress={() => onSubmit()}>
            Sign up
          </Button>
        </VStack>
      </Box>
    </Center>
  );
}

export default RegisterScreen;
