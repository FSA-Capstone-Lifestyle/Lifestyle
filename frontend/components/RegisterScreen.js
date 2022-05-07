

import React,{useState} from 'react';
import { Box, Text, Heading, VStack,WarningOutlineIcon, FormControl, Input, Link, Button, HStack, Center,Image,View,Icon} from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
function RegisterScreen() {
  const [show, setShow] = React.useState(false);
  const [userEmail,setUserEmail] = useState('');
  const [userPassword,setUserPassword] = useState('');
  const [errortext,setErrortext] = useState('');

  const handleSubmit = ({userEmail,userPassword}) => {
    console.log(userEmail,userPassword)
  }
  const displayErrors= () => {

    //return errortext.map((error,index) =><p key={index}>{error.message}</p>)
  }
  return <Center w="100%">
      <Box safeArea p="2" w="90%" maxW="290" py="8">
        <Heading size="lg" color="coolGray.800" _dark={{
        color: "warmGray.50"
      }} fontWeight="semibold">
          Welcome
        </Heading>
        <Heading mt="1" color="coolGray.600" _dark={{
        color: "warmGray.200"
      }} fontWeight="medium" size="xs">
          Sign up to continue!
        </Heading>
        <VStack space={3} mt="5">
          <FormControl>
            <FormControl.Label>Email</FormControl.Label>
            <Input size='md'InputLeftElement={<Icon as={<MaterialIcons name="email" />} size={5} ml="2" color="muted.400" />}  onChangeText={(e) => setUserEmail(e)}/>
          </FormControl>
          <FormControl>
            <FormControl.Label>Password</FormControl.Label>
            <Input size='md' type={show ? "text" : "password"} InputRightElement={<Icon as={<MaterialIcons name={show ? "visibility" : "visibility-off"} />} size={5} mr="2" color="muted.400" onPress={() => setShow(!show)} />}  onChangeText={(e) => setUserPassword(e)}/>
          </FormControl>
          <FormControl>
            <FormControl.Label>Confirm Password</FormControl.Label>
            <Input size='md' type={show ? "text" : "password"} InputRightElement={<Icon as={<MaterialIcons name={show ? "visibility" : "visibility-off"} />} size={5} mr="2" color="muted.400" onPress={() => setShow(!show)} />}  onChangeText={(e) => setUserPassword(e)}/>
          </FormControl>
          <Button mt="2" colorScheme="indigo" onPress={()=>handleSubmit({userEmail,userPassword})}>
            Sign up
          </Button>
        </VStack>
      </Box>
    </Center>;
}

export default RegisterScreen;
