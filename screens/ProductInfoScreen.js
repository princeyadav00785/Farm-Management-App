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
import { AntDesign, Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/CartReducer";

const ProductInfoScreen = () => {
  const route = useRoute();
  const { width } = Dimensions.get("window");
  const navigation = useNavigation();
  const [addedToCart, setAddedToCart] = useState(false);
  const height = (width * 100) / 100;
  const dispatch = useDispatch();
  const addItemToCart = (item) => {
    setAddedToCart(true);
    dispatch(addToCart(item));
    setTimeout(() => {
      setAddedToCart(false);
    }, 3000); // Reset added to cart message after 3 seconds
  };
  const cart = useSelector((state) => state.cart.cart);
  
  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: "white" }}
      showsVerticalScrollIndicator={false}
    >
      {/* Header/Search Bar */}
      <View style={styles.header}>
        {/* <View style={styles.searchBar}>
          <AntDesign name="search1" size={22} color="black" />
          <TextInput placeholder="Search Amazon.in" />
        </View> */}
        {/* <Feather name="mic" size={24} color="black" /> */}
      </View>

      {/* Image Carousel */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {route.params.carouselImages.map((item, index) => (
          <ImageBackground
            key={index}
            style={styles.image}
            source={{ uri: item }}
          />
        ))}
      </ScrollView>

      {/* Product Details */}
      <View style={styles.productDetails}>
        <Text style={styles.productTitle}>{route?.params?.title}</Text>
        <Text style={styles.productPrice}>₹{route?.params?.price}</Text>
        <Text style={styles.productDescription}>
          Brand: {route?.params?.brand}
        </Text>
        <Text style={styles.productDescription}>
          Description: {route?.params?.description}
        </Text>
        <Text style={styles.productDescription}>
          Color: {route?.params?.color}
        </Text>
        <Text style={styles.productDescription}>
          Size: {route?.params?.size}
        </Text>
        <Text style={styles.productDescription}>
          Rating: {route?.params?.rating}
        </Text>
      </View>

      {/* Add to Cart and Buy Now Buttons */}
      <Pressable
        onPress={() => addItemToCart(route?.params?.item)}
        style={[styles.button, { backgroundColor: "#FFC72C" }]}
      >
        {addedToCart ? <Text>Added to Cart</Text> : <Text>Add to Cart</Text>}
      </Pressable>
      <Pressable style={[styles.button, { backgroundColor: "#FFAC1C" }]}>
        <Text>Buy Now</Text>
      </Pressable>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#00CED1",
    padding: 10,
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
    width: Dimensions.get("window").width,
    height: (Dimensions.get("window").width * 100) / 100,
    resizeMode: "contain",
  },
  productDetails: {
    padding: 10,
  },
  productTitle: {
    fontSize: 15,
    fontWeight: "500",
  },
  productPrice: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 6,
  },
  productDescription: {
    fontSize: 15,
    marginTop: 6,
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

export default ProductInfoScreen;
