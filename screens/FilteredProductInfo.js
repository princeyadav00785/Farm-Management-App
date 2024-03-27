import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  TextInput,
  ImageBackground,
  Dimensions,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/CartReducer";
import { addToFav } from "../redux/FavReducer";

const FilteredProductInfo = () => {
  const route = useRoute();
  const { width } = Dimensions.get("window");
  const navigation = useNavigation();
  const [addedToFav, setAddedToFav] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const height = (width * 100) / 100;
  const dispatch = useDispatch();

  const addItemToCart = (item) => {
    setAddedToCart(true);
    dispatch(addToCart(item));
    setTimeout(() => {
      setAddedToCart(false);
    }, 1000);
  };

  const addItemToFav = (item) => {
    setAddedToFav(true);
    console.log("dispatch is called.")
    dispatch(addToFav(item));
    setTimeout(() => {
      setAddedToFav(false);
    }, 1000);
  };

  const cart = useSelector((state) => state.cart.cart);
  // console.log(cart);
  const favourites = useSelector((state) => state.favourites.favourites);
  console.log(favourites);

  return (
    <ScrollView
      style={{ marginTop: 0, flex: 1, backgroundColor: "white" }}
      showsVerticalScrollIndicator={false}
    >
      {/* <View
        style={{
          backgroundColor: "#00CED1",
          padding: 10,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Pressable
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginHorizontal: 7,
            gap: 10,
            backgroundColor: "white",
            borderRadius: 3,
            height: 38,
            flex: 1,
          }}
        >
          <AntDesign
            style={{ paddingLeft: 10 }}
            name="search1"
            size={22}
            color="black"
          />
          <TextInput placeholder="Search Amazon.in" />
        </Pressable>
      </View> */}

           <ImageBackground
            style={{   width: Dimensions.get("window").width,
            height: (Dimensions.get("window").width * 100) / 100,marginTop: 0, resizeMode: "contain" }}
            source={{ uri: route.params.carouselImages }} 
            />
         <View
         style={{
          padding:30,
          backgroundColor:"black",
         }}
         >
         <View style={{ padding: 0 }}>
        <Text style={{ fontSize: 25, fontWeight: "900", color:"white" }}>
          {route?.params?.title}
        </Text>

        <Text style={{ fontSize: 24, fontWeight: "900", marginTop: 6, color:"white" }}>
          ₹{route?.params?.price}
        </Text>
      </View>
      <Text style={{ fontSize: 18, fontWeight: "900", marginTop: 22 ,color:"white"}}>
         Description:
        </Text>
        <Text style={{ fontSize: 16, fontWeight: "900", marginTop: 6, color:"white", marginBottom:10 }}>
        {route?.params?.description}
        </Text>
        <Text style={{ fontSize: 16, fontWeight: "900", marginTop: 4, color:"white", marginBottom:40 }}>
     Ratings :   {route?.params?.description}
        </Text>
      <Text style={{ height: 1, borderColor: "#D0D0D0", borderWidth: 1 }} />
 
      <Text style={{ color: "green", marginHorizontal: 10, fontWeight: "500" }}>
        IN Stock
      </Text>
      
         </View>

            <View style ={{ backgroundColor:"black"}}>
            <Pressable
        onPress={() => addItemToCart(route?.params?.item)}
        style={{
          backgroundColor: "#FFC72C",
          padding: 10,
          borderRadius: 20,
          justifyContent: "center",
          alignItems: "center",
          marginHorizontal: 10,
          marginVertical: 10,
        }}
      >
        {addedToCart ? (
          <View>
            <Text>Added to Cart</Text>
          </View>
        ) : (
          <Text>Add to Cart</Text>
        )}
      </Pressable>

      <Pressable
        onPress={() => addItemToFav(route?.params?.item)}
        style={{
          backgroundColor: "#FFC72C",
          padding: 10,
          borderRadius: 20,
          justifyContent: "center",
          alignItems: "center",
          marginHorizontal: 10,
          marginVertical: 10,
        }}
      >
        {addedToFav ? (
          <View>
            <Text>Added to Fav</Text>
          </View>
        ) : (
          <Text>Add to Fav</Text>
        )}
      </Pressable>
            </View>
    </ScrollView>
  );
};

export default FilteredProductInfo;

const styles = StyleSheet.create({});
