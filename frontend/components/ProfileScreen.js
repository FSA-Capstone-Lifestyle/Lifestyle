import {
  View,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Avatar,
  Title,
  Caption,
  Text,
  TouchableRipple,
} from "react-native-paper";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { me } from "../store/slices/auth.slice";
import { fetchUser } from "../store/slices/singleUser.slice";

const ProfileScreen = ({ navigation }) => {
  const userInfo = useSelector((state) => state.auth);

  const user = userInfo.user.payload ? userInfo.user.payload : userInfo.user;

  const useradress =
    Object.keys(user).length === 0
      ? ""
      : ("@" + user.email.split("@")[0]).toLowerCase();

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <View style={styles.userInfoSection}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <View style={{ flexDirection: "row", marginTop: 15 }}>
              <Avatar.Image
                source={{ uri: user.image || "../../assets/profile.jpg" }}
                size={100}
              />

              <View style={{ marginLeft: 20 }}>
                <Title style={styles.title}>{user.firstName || ""}</Title>
                <Caption style={styles.caption}>{useradress || ""}</Caption>
              </View>
            </View>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("EditProfileScreen", { user: user })
              }
            >
              <Text
                style={{
                  marginTop: 25,
                  borderWidth: 1,
                  borderRadius: 30,
                  paddingHorizontal: 12,
                  paddingVertical: 4,
                  borderColor: "gray",
                  fontSize: 14,
                  fontWeight: "bold",
                  color: "#383735",
                }}
              >
                Edit Profile
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.userInfoSection}>
          {/* <View style={styles.row}>
        <MaterialIcons name="email" size={20} color="#777777" />
          <Text style={{color:'#777777',marginLeft:15}}>{user.email}</Text>
        </View> */}
        </View>
      </View>
      <View style={styles.menuWrapper}>
        <TouchableRipple
          onPress={() => {
            navigation.navigate("User Workout", { user: user });
          }}
        >
          <View style={styles.menuItem}>
            <ImageBackground
              style={{ width: 350, height: 200 }}
              source={require("../../assets/workout.jpg")}
              resizeMode="cover"
            >
              <View
                style={{
                  position: "absolute",
                  top: 15,
                  left: 15,
                  right: 0,
                  bottom: 0,
                }}
              >
                <Text style={{ fontSize: 25, color: "white" }}>
                  {"My Workout\nPlan"}
                </Text>
              </View>
            </ImageBackground>
          </View>
        </TouchableRipple>
        <TouchableRipple
          onPress={() => {
            navigation.navigate("UserDietPlanScreen", { user: user });
          }}
        >
          <View style={styles.menuItem}>
            <ImageBackground
              style={{ width: 350, height: 200 }}
              source={require("../../assets/meal.jpg")}
              resizeMode="cover"
            >
              <View
                style={{
                  position: "absolute",
                  top: 15,
                  left: 15,
                  right: 0,
                  bottom: 0,
                }}
              >
                <Text style={{ fontSize: 25, color: "white" }}>
                  {"My Diet\nPlan"}
                </Text>
              </View>
            </ImageBackground>
          </View>
        </TouchableRipple>
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  userInfoSection: {
    paddingHorizontal: 30,
    marginTop: 14,
  },
  title: {
    fontSize: 28,
    marginTop: 15,
    marginBottom: 5,
  },
  caption: {
    marginTop: 5,
    fontSize: 15,
    lineHeight: 18,
    fontWeight: "900",
  },
  row: {
    flexDirection: "row",
    marginBottom: 10,
  },
  infoBoxWrapper: {
    borderBottomColor: "#dddddd",
    borderBottomWidth: 1,
    borderTopColor: "#dddddd",
    borderTopWidth: 1,
    flexDirection: "row",
    height: 100,
  },
  infoBox: {
    width: "50%",
    alignItems: "center",
    justifyContent: "center",
  },
  menuWrapper: {
    marginTop: 60,
  },
  menuItem: {
    borderColor: "#d4d7d9",
    flexDirection: "row",

    justifyContent: "center",
    marginBottom: 25,
  },
  menuItemText: {
    color: "#777777",
    marginLeft: 20,
    fontWeight: "600",
    fontSize: 16,
    lineHeight: 26,
  },
});
