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
    console.log("dispatch is called.");
    dispatch(addToFav(item));
    setTimeout(() => {
      setAddedToFav(false);
    }, 1000);
  };

  const cart = useSelector((state) => state.cart.cart);
  // console.log(cart);
  const favourites = useSelector((state) => state.favourites.favourites);
  // console.log(favourites);

  return (
    <ScrollView
      style={{ marginTop: 0, flex: 1, backgroundColor: "white" }}
      showsVerticalScrollIndicator={false}
    >
     
      <ImageBackground
        style={{
          width: Dimensions.get("window").width,
          height: (Dimensions.get("window").width * 100) / 100,
          marginTop: 0,
          resizeMode: "contain",
        }}
        source={{ uri: route.params.carouselImages }}
      />
      <View style={styles.productDetails}>
        <Text style={styles.productTitle}>{route?.params?.title}</Text>
        <Text style={styles.productPrice}>Current Price : ₹{route?.params?.price}</Text>
        <Text style={styles.productPrice}>Old Price : ₹{route?.params?.price}</Text>
        <Text style={styles.productDescription}>
          Description: {route?.params?.description}
        </Text>
        {/* <Text style={styles.productDescription}>
          Color: {route?.params?.color}
        </Text>
        <Text style={styles.productDescription}>
          Size: {route?.params?.size}
        </Text>
        <Text style={styles.productDescription}>
          Rating: {route?.params?.rating}
        </Text>
        <Text style={styles.productDescription}>
          Harvesting Time: {route?.params?.harvestingTime}
        </Text>
        <Text style={styles.productDescription}>
          Storage Instructions: {route?.params?.storageInstructions}
        </Text> */}
      </View>
      <View style={{ backgroundColor: "black" ,height:250 }}>
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
            <Text 
            // style={{marginBottom:50}}
            >Add to Cart</Text>
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
const styles = StyleSheet.create({
  header: {
    backgroundColor: "black",
    // padding: 30,
    flexDirection: "row",
    alignItems: "center",
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 3,
    height: 38,
    flex: 1,
    paddingHorizontal: 10,
  },
  image: {
    // marginTop:10,
    width: Dimensions.get("window").width,
    height: (Dimensions.get("window").width * 100) / 100,
    resizeMode: "contain",
    backgroundColor: "black",
    // borderRadius:25
  },
  productDetails: {
    padding: 30,
    backgroundColor: "black",
  },
  productTitle: {
    color: "white",
    fontSize: 18,
    // marginLeft:35,
    marginTop:20,
    marginBottom:20,
    fontWeight: "900",
  },
  productPrice: {
    fontSize: 18,
    fontWeight: "800",
    marginTop: 6,
    color: "white",
  },
  productDescription: {
    color: "white",
    fontSize: 16,
    marginTop: 15,
  },
  button: {
    backgroundColor: "#FFAC1C",
    padding: 10,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
    marginVertical: 10,
  },
});





