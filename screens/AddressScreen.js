import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  Pressable,
  Alert,
} from "react-native";
import React, { useEffect, useState,useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwt_decode from "jwt-decode"
import { UserType } from "../UserContext";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

const AddressScreen = () => {
    const navigation = useNavigation();
  const [name, setName] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [houseNo, setHouseNo] = useState("");
  const [street, setStreet] = useState("");
  const [landmark, setLandmark] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const {userId,setUserId} = useContext(UserType)
  useEffect(() => {
    const fetchUser = async() => {
        const token = await AsyncStorage.getItem("authToken");
        const decodedToken = jwt_decode(token);
        const userId = decodedToken.userId;
        setUserId(userId)
    }

    fetchUser();
  },[]);
  console.log(userId)
  const handleAddAddress = () => {
      const address = {
          name,
          mobileNo,
          houseNo,
          street,
          landmark,
          postalCode
      }

      axios.post("http://192.168.114.200:8000/addresses",{userId,address}).then((response) => {
          Alert.alert("Success","Addresses added successfully");
          setName("");
          setMobileNo("");
          setHouseNo("");
          setStreet("");
          setLandmark("");
          setPostalCode("");

          setTimeout(() => {
            navigation.goBack();
          },500)
      }).catch((error) => {
          Alert.alert("Error","Failed to add address")
          console.log("error",error)
      })
  }
  return (
    <ScrollView style={{ marginTop: 0 }}>
      <View style={{ height: 0, backgroundColor: "#00CED1" }} />

      <View style={{ padding: 10, backgroundColor:"black" }}>
        <Text style={{ fontSize: 32, fontWeight: "bold",marginTop:30, color:"white",marginLeft:20 }}>
          Add a new Address
        </Text>

        <TextInput
          placeholderTextColor={"white"}
          placeholder="Country"
          style={{
            padding: 10,
            borderColor: "#D0D0D0",
            borderWidth: 1,
            marginTop: 10,
            borderRadius: 5,
            color: "white",

          }}
        />

        <View style={{ marginVertical: 10 }}>
          <Text style={{ fontSize: 15, fontWeight: "bold", color:"white" }}>
            Full name (First and last name)
          </Text>

          <TextInput
            value={name}
            onChangeText={(text) => setName(text)}
            placeholderTextColor={"white"}
            style={{
              padding: 10,
              borderColor: "#D0D0D0",
              borderWidth: 1,
              marginTop: 10,
              borderRadius: 5,
              color: "white",
            }}
            placeholder="enter your name"
          />
        </View>

        <View>
          <Text style={{ fontSize: 15, fontWeight: "bold" , color:"white"}}>
            Mobile numebr
          </Text>

          <TextInput
            value={mobileNo}
            onChangeText={(text) => setMobileNo(text)}
            placeholderTextColor={"white"}
            style={{
              padding: 10,
              borderColor: "#D0D0D0",
              borderWidth: 1,
              marginTop: 10,
              borderRadius: 5,
              color: "white",
            }}
            placeholder="Mobile No"
          />
        </View>

        <View style={{ marginVertical: 10 }}>
          <Text style={{ fontSize: 15, fontWeight: "bold", color:"white" }}>
            Flat,House No,Building,Company
          </Text>

          <TextInput
            value={houseNo}
            onChangeText={(text) => setHouseNo(text)}
            placeholderTextColor={"white"}
            style={{
              padding: 10,
              borderColor: "#D0D0D0",
              borderWidth: 1,
              marginTop: 10,
              borderRadius: 5,
              color: "white",
            }}
            placeholder="House No."
          />
        </View>

        <View>
          <Text style={{ fontSize: 15, fontWeight: "bold", color:"white" }}>
            Area,Street,sector,village
          </Text>
          <TextInput
            value={street}
            onChangeText={(text) => setStreet(text)}
            placeholderTextColor={"white"}
            style={{
              padding: 10,
              borderColor: "#D0D0D0",
              borderWidth: 1,
              marginTop: 10,
              borderRadius: 5,
              color: "white",
            }}
            placeholder="Street"
          />
        </View>

        <View style={{ marginVertical: 10 }}>
          <Text style={{ fontSize: 15, fontWeight: "bold", color:"white" }}>Landmark</Text>
          <TextInput
            value={landmark}
            onChangeText={(text) => setLandmark(text)}
            placeholderTextColor={"white"}
            style={{
              padding: 10,
              borderColor: "#D0D0D0",
              borderWidth: 1,
              marginTop: 10,
              borderRadius: 5,
              color: "white",
            }}
            placeholder="Eg near appollo hospital"
          />
        </View>

        <View>
          <Text style={{ fontSize: 15, fontWeight: "bold", color:"white" }}>Pincode</Text>

          <TextInput
            value={postalCode}
            onChangeText={(text) => setPostalCode(text)}
            placeholderTextColor={"white"}
            style={{
              padding: 10,
              borderColor: "#D0D0D0",
              borderWidth: 1,
              marginTop: 10,
              borderRadius: 5,
              color: "white",
            }}
            placeholder="Enter Pincode"
          />
        </View>

       <View 
       style={{height:200}}
       >
       <Pressable
        onPress={handleAddAddress}
          style={{
            backgroundColor: "#FFC72C",
            padding: 19,
            borderRadius: 6,
            justifyContent: "center",
            alignItems: "center",
            marginTop: 20,
            
          }}
        >
          <Text style={{ fontWeight: "bold", color:"white" }}>Add Address</Text>
        </Pressable>
       </View>
      </View>
    </ScrollView>
  );
};

export default AddressScreen;

const styles = StyleSheet.create({});
