import { StyleSheet, Text, View,Image,ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { me } from "../store/slices/auth.slice";
import { NavigationContainer } from '@react-navigation/native';
export default function SplashScreen({ navigation }) {
  const [animating, setAnimating] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    setTimeout(() => {
      setAnimating(false);
      async function getToken(){
        const token = await dispatch(me());

        if(!token.payload){

          navigation.navigate('AuthStack')
        }else{

          navigation.navigate('AppStack')
        }
      }

      getToken()
    }, 3000);
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/logo.png')}
        style={{width: '90%', resizeMode: 'cover', margin: 30}}
      />
      <ActivityIndicator
        animating={animating}
        color="blue"
        size="large"
        style={styles.activityIndicator}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  activityIndicator: {
    alignItems: 'center',
    height: 80,
  },
});
