import React from "react";
import { Platform, StatusBar } from "react-native";
import {
  StackNavigator,
  TabNavigator,
  SwitchNavigator
} from "react-navigation";
import { FontAwesome } from "react-native-vector-icons";

import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import HomeScreen from "./pages/HomeScreen";

const headerStyle = {
  marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
};

export const SignedOut = StackNavigator({
    SignIn: {
        screen: SignIn,
        navigationOptions: {
        title: "Sign In",
         headerStyle
        }
      },
    SignUp: {
        screen: SignUp,
        navigationOptions: {
        title: "Sign Up",
        headerStyle
        }
    }
});

export const SignedIn = TabNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: {
        tabBarLabel: "Home",
        tabBarIcon: ({ tintColor }) => (
          <FontAwesome name="home" size={30} color={tintColor} />
        )
      }
    },
    Profile: {
      screen: Profile,
      navigationOptions: {
        tabBarLabel: "Profile",
        tabBarIcon: ({ tintColor }) => (
          <FontAwesome name="user" size={30} color={tintColor} />
        )
      }
    }
  },
  {
    tabBarOptions: {
      style: {
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
      }
    }
  }
);

export const createRootNavigator = (signedIn = false) => {
  return SwitchNavigator(
    {
      SignedIn: {
        screen: SignedIn
      },
      SignedOut: {
        screen: SignedOut
      }
    },
    {
      initialRouteName: signedIn ? "SignedIn" : "SignedOut"
    }
  );
};