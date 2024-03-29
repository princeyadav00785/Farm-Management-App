import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  TextInput,
} from "react-native";
import React, { useEffect, useContext, useState, useCallback } from "react";
import { Feather, AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import axios from "axios";
import { UserType } from "../UserContext";

const AddAddressScreen = () => {
  const navigation = useNavigation();
  const [addresses, setAddresses] = useState([]);
  const { userId, setUserId } = useContext(UserType);
  console.log("userId", userId);
  useEffect(() => {
    fetchAddresses();
  }, []);
  const fetchAddresses = async () => {
    try {
      const response = await axios.get(
        `http://192.168.114.200:8000/addresses/${userId}`
      );
      const { addresses } = response.data;

      setAddresses(addresses);
    } catch (error) {
      console.log("error", error);
    }
  };
  //refresh the addresses when the component comes to the focus ie basically when we navigate back
  useFocusEffect(
    useCallback(() => {
      fetchAddresses();
    }, [])
  );
  console.log("addresses", addresses);
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{ backgroundColor: "black" }}
    >
      <View style={{ padding: 10 }}>
        <Text
          style={{
            fontSize: 36,
            fontWeight: "bold",
            color: "white",
            marginTop: 80,
            marginLeft: 40,
          }}
        >
          Your Addresses
        </Text>

        <Pressable
          onPress={() => navigation.navigate("Add")}
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: 10,
            borderColor: "white",
            borderWidth: 1,
            borderLeftWidth: 0,
            borderRightWidth: 0,
            paddingVertical: 7,
            paddingHorizontal: 5,
          }}
        >
          <Text style={{ color: "white", fontSize: 22 }}>
            Add a new Address
          </Text>
          <MaterialIcons name="keyboard-arrow-right" size={24} color="white" />
        </Pressable>
        {addresses.length === 0 ? (
          <View style={{ marginHorizontal: 10 }}>
            <Text style={{ fontSize: 32, fontWeight: "bold" , color:"white",marginTop:50}}>
              No Saved Address Found
            </Text>
          </View>
        ) : (
          // Render address selection section here
          <View style={{ marginHorizontal: 20 }}>
            <Pressable>
              {/* all the added adresses */}
              {addresses?.map((item, index) => (
                <Pressable
                  key={index}
                  style={{
                    borderWidth: 1,
                    borderColor: "#D0D0D0",
                    padding: 10,
                    flexDirection: "column",
                    gap: 5,
                    marginVertical: 10,
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 3,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 20,
                        fontWeight: "bold",
                        color: "white",
                      }}
                    >
                      {item?.name}
                    </Text>
                    <Entypo name="location-pin" size={24} color="red" />
                  </View>

                  <Text style={{ fontSize: 20, color: "white" }}>
                    {item?.houseNo}, {item?.landmark}
                  </Text>

                  <Text style={{ fontSize: 20, color: "white" }}>
                    {item?.street}
                  </Text>

                  <Text style={{ fontSize: 20, color: "white" }}>
                    India, Bangalore
                  </Text>

                  <Text style={{ fontSize: 20, color: "white" }}>
                    phone No : {item?.mobileNo}
                  </Text>
                  <Text style={{ fontSize: 20, color: "white" }}>
                    pin code : {item?.postalCode}
                  </Text>

                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 10,
                      marginTop: 7,
                    }}
                  >
                  </View>
                </Pressable>
              ))}
            </Pressable>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default AddAddressScreen;

const styles = StyleSheet.create({});
