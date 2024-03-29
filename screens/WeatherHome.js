import {
  View,
  Text,
  ImageBackground,
  Image,
  TextInput,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React, { useLayoutEffect, useEffect, useContext, useState } from "react";
import { deviceHeight, deviceWidth } from "./Dimensions";
import Icon from "react-native-vector-icons/Ionicons";
import Cards from "./Card";
import axios from "axios";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { UserType } from "../UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const WeatherHome = (props) => {
  const { userId, setUserId } = useContext(UserType);
  const [user, setUser] = useState();
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      // Header options
    });
  }, []);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(
          `http://192.168.114.200:8000/profile/${userId}`
        );
        const { user } = response.data;
        setUser(user);
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchUserProfile();
  }, []);
  const [city, setCity] = useState("");

  const cities = [
    {
      name: "Mumbai",
      image: require("../assets/images/image3.jpg"),
    },
    {
      name: "Delhi",
      image: require("../assets/images/image4.jpg"),
    },
    {
      name: "Bangalore",
      image: require("../assets/images/image5.jpg"),
    },
    {
      name: "Kolkata",
      image: require("../assets/images/image6.jpg"),
    },
    {
      name: "Chennai",
      image: require("../assets/images/image7.jpg"),
    },
  ];

  return (
    <View style={{ marginBottom: 30 }}>
      <ImageBackground
        source={require("../assets/images/image2.jpg")}
        style={{ height: deviceHeight, width: deviceWidth }}
        imageStyle={{ opacity: 1, backgroundColor: "black" }}
      />
      <View
        style={{
          position: "absolute",
          paddingVertical: 20,
          paddingHorizontal: 10,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            width: deviceWidth - 20,
          }}
        >
          <Icon name="menu" size={46} color="white" />
          {/* <Image
            source={require('../assets/images/user.jpg')}
            style={{height: 46, width: 46, borderRadius: 50}}
          /> */}
        </View>
        <View style={{ paddingHorizontal: 20, marginTop: 100 }}>
          <Text style={{ fontSize: 40, color: "white" }}>
            Hello {user?.name}
          </Text>
          <Text style={{ color: "white", fontSize: 22, fontWeight: "bold" }}>
            Search the city by the name
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              borderRadius: 50,
              borderWidth: 1,
              borderColor: "white",
              marginTop: 16,
              paddingHorizontal: 10,
              padding:7
            }}
          >
            <TextInput
              value={city}
              onChangeText={(val) => setCity(val)}
              placeholder="Search City"
              placeholderTextColor="white"
              style={{ paddingHorizontal: 20, color: "white", fontSize: 24 }}
            />
            <TouchableOpacity
              onPress={() =>
                props.navigation.navigate("Details", { name: city })
              }
            >
              <Icon name="search" size={22} color="white" />
            </TouchableOpacity>
          </View>
          <Text
            style={{
              color: "white",
              fontSize: 30,
              paddingHorizontal: 10,
              marginTop: 140,
              marginBottom: 20,
            }}
          >
            My Locations
          </Text>
          <FlatList
            horizontal
            data={cities}
            renderItem={({ item }) => (
              <Cards
                name={item.name}
                image={item.image}
                navigation={props.navigation}
              />
            )}
          />
        </View>
      </View>
    </View>
  );
};

export default WeatherHome;
