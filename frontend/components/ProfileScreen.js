import { View,StyleSheet,TouchableOpacity} from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import {Avatar,Title,Caption,Text,TouchableRipple} from 'react-native-paper'
import { FontAwesome } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
const ProfileScreen = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.userInfoSection}>
        <View style={{flexDirection:'row',justifyContent:'space-between'}}>
        <View style={{flexDirection:'row',marginTop:15}}>
          <Avatar.Image source={require('../../assets/profile.jpg')}
          size={75}/>

          <View style={{marginLeft:20}}>
            <Title style={styles.title}>John Doe</Title>
            <Caption style={styles.caption}>@j_doe</Caption>
          </View>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('EditProfileScreen')}>
        <MaterialIcons  style={{marginTop:25}}
        name="edit" size={24} color="black" />
        </TouchableOpacity>
        </View>
      </View>
      <View style={styles.userInfoSection}>

        <View style={styles.row}>
          <FontAwesome name="phone" size={20} color="#777777" />
          <Text style={{color:'#777777',marginLeft:15}}>+1-5186805507</Text>
        </View>
        <View style={styles.row}>
        <MaterialIcons name="email" size={20} color="#777777" />
          <Text style={{color:'#777777',marginLeft:15}}>jhon_doe@gmail.com</Text>
        </View>
      </View>
      <View style={styles.menuWrapper}>
        <TouchableRipple onPress={() => {}}>
          <View style={styles.menuItem}>
            <Icon name="heart-outline" color="#FF6347" size={25}/>
            <Text style={styles.menuItemText}>My Workout Plan</Text>
          </View>
        </TouchableRipple>
        <TouchableRipple onPress={() => {}}>
          <View style={styles.menuItem}>
            <Icon name="credit-card" color="#FF6347" size={25}/>
            <Text style={styles.menuItemText}>My Diet Plan</Text>
          </View>
        </TouchableRipple>
        <TouchableRipple onPress={() => {}}>
          <View style={styles.menuItem}>
            <Icon name="share-outline" color="#FF6347" size={25}/>
            <Text style={styles.menuItemText}>Tell Your Friends</Text>
          </View>
        </TouchableRipple>
        <TouchableRipple onPress={() => {}}>
          <View style={styles.menuItem}>
            <Icon name="account-check-outline" color="#FF6347" size={25}/>
            <Text style={styles.menuItemText}>Support</Text>
          </View>
        </TouchableRipple>

      </View>
    </SafeAreaView>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  userInfoSection: {
    paddingHorizontal: 30,
    marginBottom: 25,

  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop:15,
    marginBottom:5,
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    fontWeight: '500',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  infoBoxWrapper: {
    borderBottomColor: '#dddddd',
    borderBottomWidth: 1,
    borderTopColor: '#dddddd',
    borderTopWidth: 1,
    flexDirection: 'row',
    height: 100,
  },
  infoBox: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuWrapper: {
    marginTop: 10,
  },
  menuItem: {
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  menuItemText: {
    color: '#777777',
    marginLeft: 20,
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 26,
  },
});
