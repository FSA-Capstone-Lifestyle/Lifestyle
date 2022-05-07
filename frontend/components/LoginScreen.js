import React,{useState} from 'react';
import { Box, Text, Heading, VStack,WarningOutlineIcon, FormControl, Input, Link, Button, HStack, Center,Image,View,Icon} from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
function LoginScreen({navigation}) {
  const [show, setShow] = React.useState(false);
  const [userEmail,setUserEmail] = useState('');
  const [userPassword,setUserPassword] = useState('')
  const [errortext,setErrortext] = useState('')

  const handleSubmit = ({userEmail,userPassword}) => {
    console.log(userEmail,userPassword)
  }
  const displayErrors= () => {

    //return errortext.map((error,index) =><p key={index}>{error.message}</p>)
  }

  return <Center w="100%" h="100%" bg='white'>
      <Box safeArea p="2" py="8" w="90%" maxW="290">

        <View style={{alignItems: 'center'}}>
              <Image
                alt="description of image"
                source={require('../../assets/logo.png')}
                style={{
                  width: '70%',
                  height: 200,
                  resizeMode: 'cover',
                  margin: 30,
                }}
              />
            </View>

        <VStack space={3} mt="2">
          <FormControl>
            <FormControl.Label>Email</FormControl.Label>
            <Input size='md' InputLeftElement={<Icon as={<MaterialIcons name="email" />} size={5} ml="2" color="muted.400" />} onChangeText={(e) => setUserEmail(e)}/>
          </FormControl>
          <FormControl>
            <FormControl.Label>Password</FormControl.Label>
            <Input size='md' type={show ? "text" : "password"} InputRightElement={<Icon as={<MaterialIcons name={show ? "visibility" : "visibility-off"} />} size={5} mr="2" color="muted.400" onPress={() => setShow(!show)} />}  onChangeText={(e) => setUserPassword(e)}/>
            {errortext != '' ? <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
              {displayErrors()}
            </FormControl.ErrorMessage> : null}
            <Link _text={{
            fontSize: "xs",
            fontWeight: "500",
            color: "indigo.500"
          }} alignSelf="flex-end" mt="1">
              Forget Password?
            </Link>
          </FormControl>

          <Button mt="2" colorScheme="indigo" onPress={() => handleSubmit({userEmail,userPassword})}>
            Sign in
          </Button>
          <HStack mt="6" justifyContent="center">
            <Text fontSize="sm" color="coolGray.600" _dark={{
            color: "warmGray.200"
          }}>
              I'm a new user.{" "}
            </Text>
            <Link onPress={() => navigation.navigate('RegisterScreen')} _text={{
            color: "indigo.500",
            fontWeight: "medium",
            fontSize: "sm"
          }} >
              Sign Up
            </Link>
          </HStack>
        </VStack>
      </Box>
    </Center>;
}

export default LoginScreen;
