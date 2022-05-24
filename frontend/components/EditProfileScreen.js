import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  TextInput,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { updateUser } from "../store/slices/singleUser.slice";
import { me } from "../store/slices/auth.slice";
import Animated from "react-native-reanimated";
import BottomSheet from "reanimated-bottom-sheet";

const EditProfileScreen = (props) => {
  const user = props.route.params.user;
  const [userData, setuserData] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    id: props.route.params.user.id,
  });
  const [errortext, setErrortext] = useState([]);
  const dispatch = useDispatch();
  bs = React.createRef();
  fall = new Animated.Value(1);

  renderInner = () => (
    <View style={styles.panel}>
      <View style={{ alignItems: "center" }}>
        <Text style={styles.panelTitle}> Upload Photo </Text>
        <Text style={styles.panelSubtitle}> Choose Your Profile Picture </Text>
      </View>
      <TouchableOpacity style={styles.panelButton}>
        <Text style={styles.panelButtonTitle}>Take a Photo</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.panelButton}>
        <Text style={styles.panelButtonTitle}>Choose From Library</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.panelButton}
        onPress={() => this.bs.current.snapTo(1)}
      >
        <Text style={styles.panelButtonTitle}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );

  renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.panelHeader}>
        <View style={styles.panelHandle}></View>
      </View>
    </View>
  );

  const handleSubmit = ({ firstName, lastName, email }) => {
    setErrortext([]);
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      setErrortext([
        { message: "You have entered an invalid email address! \n" },
      ]);
      return false;
    }
    console.log(firstName, lastName, email);
    dispatch(updateUser(userData));
    dispatch(me());
    props.navigation.navigate("ProfileScreen");
  };
  const displayErrors = () => {
    return errortext.map((error, index) => (
      <Text key={index}>{error.message}</Text>
    ));
  };
  return (
    <View style={styles.container}>
      <BottomSheet
        ref={this.bs}
        snapPoints={[330, 0]}
        renderContent={this.renderInner}
        renderHeader={this.renderHeader}
        initialSnap={1}
        callbackNode={this.fall}
        enabledGestureInteraction={true}
      />
      <View style={{ margin: 20 }}>
        <View style={{ alignItems: "center" }}>
          <TouchableOpacity onPress={() => this.bs.current.snapTo(0)}>
            <View
              style={{
                height: 100,
                width: 100,
                borderRadius: 15,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <ImageBackground
                source={{ uri: user.image }}
                style={{ height: 100, width: 100 }}
                imageStyle={{ borderRadius: 15 }}
              >
                <View
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Icon
                    name="camera"
                    size={35}
                    color="#fff"
                    style={{
                      opacity: 0.7,
                      alignItems: "center",
                      justifyContent: "center",
                      borderWidth: 1,
                      borderColor: "#fff",
                      borderRadius: 10,
                    }}
                  />
                </View>
              </ImageBackground>
            </View>
          </TouchableOpacity>
          <Text style={{ marginTop: 10, fontSize: 18, fontWeight: "bold" }}>
            {user.firstName + " " + user.lastName}
          </Text>
        </View>
        <View style={styles.action}>
          <FontAwesome name="user-o" size={20} />
          <TextInput
            onChangeText={(e) =>
              setuserData((prevState) => ({ ...prevState, firstName: e }))
            }
            value={userData.firstName}
            placeholderTextColor="#666666"
            autoCorrect={false}
            style={styles.textInput}
          />
        </View>
        <View style={styles.action}>
          <FontAwesome name="user-o" size={20} />
          <TextInput
            onChangeText={(e) =>
              setuserData((prevState) => ({ ...prevState, lastName: e }))
            }
            value={userData.lastName}
            placeholderTextColor="#666666"
            autoCorrect={false}
            style={styles.textInput}
          />
        </View>
        {/* <View style={styles.action}>
        <Feather name="phone" size={20} color="black" />
            <TextInput
            onChangeText={(e) => setuserData(prevState => ({...prevState , phoneNumber : e}))}
            placeholder='Phone'
            textContentType='telephoneNumber'
            placeholderTextColor='#666666'
            keyboardType='number-pad'
            autoCorrect={false}
            style={styles.textInput}/>
        </View> */}
        <View style={styles.action}>
          <FontAwesome name="envelope-o" size={20} />
          <TextInput
            onChangeText={(e) =>
              setuserData((prevState) => ({ ...prevState, email: e }))
            }
            value={userData.email}
            textContentType="password"
            placeholderTextColor="#666666"
            keyboardType="email-address"
            autoCorrect={false}
            style={styles.textInput}
          />
        </View>
        {errortext != "" ? (
          <Text style={{ color: "red" }}>{displayErrors()}</Text>
        ) : null}
        <TouchableOpacity
          style={styles.commandButton}
          onPress={() => handleSubmit(userData)}
        >
          <Text style={styles.panelButtonTitle}>Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default EditProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  commandButton: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: "#6D8B74",
    alignItems: "center",
    marginTop: 10,
  },
  panel: {
    padding: 20,
    backgroundColor: "#FFFFFF",
    paddingTop: 20,
    // borderTopLeftRadius: 20,
    // borderTopRightRadius: 20,
    // shadowColor: '#000000',
    // shadowOffset: {width: 0, height: 0},
    // shadowRadius: 5,
    // shadowOpacity: 0.4,
  },
  header: {
    backgroundColor: "#FFFFFF",
    shadowColor: "#333333",
    shadowOffset: { width: -1, height: -3 },
    shadowRadius: 2,
    shadowOpacity: 0.4,
    // elevation: 5,
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panelHeader: {
    alignItems: "center",
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#00000040",
    marginBottom: 10,
  },
  panelTitle: {
    fontSize: 27,
    height: 35,
  },
  panelSubtitle: {
    fontSize: 14,
    color: "gray",
    height: 30,
    marginBottom: 10,
  },
  panelButton: {
    padding: 13,
    borderRadius: 10,
    backgroundColor: "#FF6347",
    alignItems: "center",
    marginVertical: 7,
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: "white",
  },
  action: {
    flexDirection: "row",
    marginTop: 20,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "gray",
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    fontSize: 15,
    marginTop: -5,
    paddingLeft: 10,
    color: "#05375a",
  },
});
