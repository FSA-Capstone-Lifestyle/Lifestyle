import { StyleSheet, Text, View,TouchableOpacity,ImageBackground,TextInput } from 'react-native'
import React,{useState} from 'react'
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Feather } from '@expo/vector-icons';
const EditProfileScreen = () => {
  const [userData,setuserData] = useState({ firstName : '',
                                   lastName : '',
                                   email: '',
                                   phoneNumber: '',})
  const [errortext,setErrortext] = useState([]);
  console.log(userData,errortext);

  const handleSubmit = ({firstName,lastName,email,phoneNumber}) => {
    setErrortext([])
    console.log('handleSubmit',firstName,lastName,email,phoneNumber)
    if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)))
      {
        setErrortext([{message : 'You have entered an invalid email address! \n'}])
        console.log(errortext);
      }
    if(!(phoneNumber.match(/^\d{10}$/))){
      setErrortext(prevState => [...prevState,{message : 'You have entered an invalid phone number! '}])
        console.log(errortext);
    }

  }
  const displayErrors = () =>{
    return errortext.map((error,index) =><Text key={index}>{error.message}</Text>)
  }
  return (
    <View style={styles.container}>
      <View style={{margin:20}}>
        <View style={{alignItems:'center'}}>
            <TouchableOpacity onPress={()=>{}}>
              <View style={{height:100,
                            width:100,
                            borderRadius:15,
                            justifyContent:'center',
                            alignItems:'center'}}>

                <ImageBackground source={require('../../assets/profile.jpg')}
                                  style={{height:100,width:100}}
                                  imageStyle={{borderRadius:15}}>

                    <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                        <Icon name='camera' size={35} color='#fff' style={{
                          opacity:0.7,
                          alignItems:'center',
                          justifyContent:'center',
                          borderWidth:1,
                          borderColor:'#fff',
                          borderRadius:10,
                        }}/>
                    </View>
                </ImageBackground>
              </View>
            </TouchableOpacity>
            <Text style={{marginTop:10,fontSize:18,fontWeight:'bold'}}>John Doe</Text>
        </View>
        <View style={styles.action}>
            <FontAwesome name='user-o' size={20}/>
            <TextInput
            onChangeText={(e) => setuserData(prevState => ({...prevState , firstName : e}))}
            placeholder='First Name'
            placeholderTextColor='#666666'
            autoCorrect={false}
            style={styles.textInput}/>
        </View>
        <View style={styles.action}>
            <FontAwesome name='user-o' size={20}/>
            <TextInput
            onChangeText={(e) => setuserData(prevState => ({...prevState , lastName : e}))}
            placeholder='Last Name'
            placeholderTextColor='#666666'
            autoCorrect={false}
            style={styles.textInput}/>
        </View>
        <View style={styles.action}>
        <Feather name="phone" size={20} color="black" />
            <TextInput
            onChangeText={(e) => setuserData(prevState => ({...prevState , phoneNumber : e}))}
            placeholder='Phone'
            textContentType='telephoneNumber'
            placeholderTextColor='#666666'
            keyboardType='number-pad'
            autoCorrect={false}
            style={styles.textInput}/>
        </View>
        <View style={styles.action}>
            <FontAwesome name='envelope-o' size={20}/>
            <TextInput
            onChangeText={(e) => setuserData(prevState => ({...prevState , email : e}))}
            placeholder='Email'
            textContentType='password'
            placeholderTextColor='#666666'
            keyboardType='email-address'
            autoCorrect={false}
            style={styles.textInput}/>
        </View>
        {errortext != '' ? <Text style={{color:'red'}}>
              {displayErrors()}
            </Text> : null}
        <TouchableOpacity style={styles.commandButton} onPress={()=>handleSubmit(userData)}>
          <Text style={styles.panelButtonTitle}>Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default EditProfileScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  commandButton: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#6D8B74',
    alignItems: 'center',
    marginTop: 10,
  },
  panel: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    paddingTop: 20,
    // borderTopLeftRadius: 20,
    // borderTopRightRadius: 20,
    // shadowColor: '#000000',
    // shadowOffset: {width: 0, height: 0},
    // shadowRadius: 5,
    // shadowOpacity: 0.4,
  },
  header: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#333333',
    shadowOffset: {width: -1, height: -3},
    shadowRadius: 2,
    shadowOpacity: 0.4,
    // elevation: 5,
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panelHeader: {
    alignItems: 'center',
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00000040',
    marginBottom: 10,
  },

  panelButtonTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white',
  },
  action: {
    flexDirection: 'row',
    marginTop: 20,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    fontSize:15,
    marginTop:-5,
    paddingLeft: 10,
    color: '#05375a',
  },
});
