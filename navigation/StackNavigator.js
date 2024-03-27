import { StyleSheet } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import HomeScreen from "../screens/HomeScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import ProductInfoScreen from "../screens/ProductInfoScreen";
import AddAddressScreen from "../screens/AddAddressScreen";
import AddressScreen from "../screens/AddressScreen";
import CartScreen from "../screens/CartScreen";
import ProfileScreen from "../screens/ProfileScreen";
import ConfirmationScreen from "../screens/ConfirmationScreen";
import OrderScreen from "../screens/OrderScreen";
import WeatherScreen from "../screens/WeatherScreen";
import FilteredProductInfo from "../screens/FilteredProductInfo";
import SearchScreen from "../screens/SearchScreen";
import { FontAwesome5 } from '@expo/vector-icons';
import ModelPage from "../screens/ModelPage";
import FavScreen from "../screens/FavScreen";

const StackNavigator = () => {
  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();

  function BottomTabs() {
    return (
      <Tab.Navigator
        screenOptions={{
          // headerShown: false,
          tabBarStyle: { backgroundColor: "black" },
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarLabel: "Home",
            tabBarLabelStyle: { color: "white" },
            headerShown: false,
            tabBarIcon: ({ focused }) =>
              focused ? (
                <Entypo name="home" size={24} color="#008E97" />
              ) : (
                <AntDesign name="home" size={24} color="white" />
              ),
          }}
        />
        <Tab.Screen
          name="Weather"
          component={WeatherScreen}
          options={{
            tabBarLabel: "Weather",
            tabBarLabelStyle: { color: "white" },
            headerShown: false,
            tabBarIcon: ({ focused }) =>
              focused ? (
                <AntDesign name="cloud" size={24} color="#008E97" />
              ) : (
                <AntDesign name="cloud" size={24} color="white" />
              ),
          }}
        />

        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            tabBarLabel: "Profile",
            tabBarLabelStyle: { color: "#008E97" },
            tabBarIcon: ({ focused }) =>
              focused ? (
                <Ionicons name="person" size={24} color="#008E97" />
              ) : (
                <Ionicons name="person-outline" size={24} color="white" />
              ),
          }}
        />

          <Tab.Screen
          name="Fav"
          component={FavScreen}
          options={{
            tabBarLabel: "Favourites",
            tabBarLabelStyle: { color: "#008E97" },
            headerShown: false,
            tabBarIcon: ({ focused }) =>
              focused ? (
                <AntDesign name="heart" size={24} color="#008E97" />
              ) : (
                <AntDesign name="heart" size={24} color="white" />
              ),
          }}
         />
        <Tab.Screen
          name="Cart"
          component={CartScreen}
          options={{
            tabBarLabel: "Cart",
            tabBarLabelStyle: { color: "#008E97" },
            headerShown: false,
            tabBarIcon: ({ focused }) =>
              focused ? (
                <AntDesign name="shoppingcart" size={24} color="#008E97" />
              ) : (
                <AntDesign name="shoppingcart" size={24} color="white" />
              ),
          }}
        />
          <Tab.Screen
          name="Predictor"
          component={ModelPage}
          options={{
            tabBarLabel: "Predictor",
            tabBarLabelStyle: { color: "#008E97" },
            headerShown: false,
            tabBarIcon: ({ focused }) =>
              focused ? (
                <FontAwesome5 name="robot" size={24} color="black" />
              ) : (
                <FontAwesome5 name="robot" size={24} color="white" />
              ),
          }}
        />
      </Tab.Navigator>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          contentStyle: { flex: 1 }, // Ensure content takes up the entire screen
          safeAreaInsets: { top: 0, right: 0, bottom: 0, left: 0 }, // Adjust safe area insets
        }}
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Main" component={BottomTabs} />
        <Stack.Screen name="Info" component={ProductInfoScreen} />
        <Stack.Screen name="ProductInfo" component={FilteredProductInfo} />
        <Stack.Screen name="Address" component={AddAddressScreen} />
        <Stack.Screen name="Add" component={AddressScreen} />
        <Stack.Screen name="Confirm" component={ConfirmationScreen} />
        <Stack.Screen name="Order" component={OrderScreen} />
        <Stack.Screen name="Search" component={SearchScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;

const styles = StyleSheet.create({});
