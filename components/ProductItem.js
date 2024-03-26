import React, { useState } from "react";
import { View, Text, Image, Pressable, StyleSheet } from "react-native";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/CartReducer";
import { useNavigation } from "@react-navigation/native";

const ProductItem = ({ item }) => {
  const [addedToCart, setAddedToCart] = useState(false);
  const dispatch = useDispatch();
  const navigation = useNavigation(); 
  const addItemToCart = () => {
    setAddedToCart(true);
    dispatch(addToCart(item));
    setTimeout(() => {
      setAddedToCart(false);
    }, 1000); // Set a timeout for how long the "Added to Cart" message will be displayed
  };

  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => {
          navigation.navigate("ProductInfo", {
            id: item.id,
            title: item.title,
            price: item?.price,
            carouselImages: item.image,
            item: item,
            description: item.description,
          });
        }}
      >
        <Image
          style={styles.image}
          source={{ uri: item.image }}
        />

        <Text numberOfLines={1} style={styles.title}>
          {item.title}
        </Text>

        <View style={styles.detailsContainer}>
          <Text style={styles.price}>₹{item.price}</Text>
          <Text style={styles.rating}>{item.rating.rate} ratings</Text>
        </View>
      </Pressable>

      <Pressable
        onPress={addItemToCart}
        style={[
          styles.addToCartButton,
          addedToCart && styles.addedToCartButton 
        ]}
      >
        <Text style={styles.addToCartButtonText}>
          {addedToCart ? "Added to Cart" : "Add to Cart"}
        </Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#334433",
    borderRadius: 10,
    margin: 10,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image: {
    width: 150,
    height: 150,
    resizeMode: "cover",
    borderRadius: 10,
    marginBottom: 10,
  },
  title: {
    marginTop:10,
    fontSize: 16,
    fontWeight: "bold",
    color: "#333333",
    marginBottom: 5,
    color:"white"
  },
  detailsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  price: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#FF5733",
  },
  rating: {
    color: "#FFC72C",
    fontWeight: "bold",
  },
  addToCartButton: {
    backgroundColor: "#FFC72C",
    padding: 10,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  addedToCartButton: {
    backgroundColor: "#90EE90", // Change color when item is added to cart
  },
  addToCartButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default ProductItem;
