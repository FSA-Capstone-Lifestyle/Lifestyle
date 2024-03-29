import { View, Text,ImageBackground,Image, TouchableOpacity } from 'react-native'
import React,{useEffect} from 'react'
import {DrawerContentScrollView,DrawerItemList} from '@react-navigation/drawer'
import { Ionicons } from '@expo/vector-icons';

import { useDispatch,useSelector } from 'react-redux';
import { logout } from '../store/slices/auth.slice';
import { NavigationHelpersContext } from '@react-navigation/native';
import { me  } from '../store/slices/auth.slice';
const CustomDrawer = (props) => {
  const userInfo2 = useSelector((state) => state.auth)


  const user = userInfo2.user.payload ? userInfo2.user.payload : userInfo2.user
  const dispatch = useDispatch();

  return (
    <View style={{flex:1}}>
    <DrawerContentScrollView {...props} contentContainerStyle={{backgroundColor:'#CEE5D0'}}>
      <ImageBackground source={require('../../assets/bg-profile3.jpeg')} style={{padding:20}}>

      <Image source={{uri : user.image || '../../assets/profile.jpg' }} style={{height:80,width:80,borderRadius:40,marginBottom:10}}/>
      <Text style={{color:'#fff', fontSize:23, fontWeight:'bold'}}>{user.firstName + ' ' + user.lastName}</Text>

      </ImageBackground>
      <View style={{flex : 1,backgroundColor:'#fff',paddingTop:10}}>
      <DrawerItemList {...props}/>
      </View>
    </DrawerContentScrollView>
    <View style={{padding:20,borderTopWidth:3,borderTopColor:'#ccc'}}>
      <TouchableOpacity onPress={() => {}} style={{paddingVertical:15}}>
        <View style={{flexDirection:'row',alignItems:'center'}}>
          <Ionicons name='share-social-outline' size={20}/>
          <Text style={{fontSize:15,marginLeft:5}}>Tell a Friend</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={(e) => {
        e.preventDefault();

        props.navigation.navigate('AuthStack')
        dispatch(logout())
        }} style={{paddingVertical:15}}>
        <View style={{flexDirection:'row',alignItems:'center'}}>
          <Ionicons name='exit-outline' size={20}/>
          <Text style={{fontSize:15,marginLeft:5}}>Sign Out</Text>
        </View>
      </TouchableOpacity>
    </View>
    </View>

  )
}

export default CustomDrawer
