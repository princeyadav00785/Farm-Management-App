import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    Pressable,
    Image,
  } from "react-native";
  import React from "react";
  import { AntDesign } from "@expo/vector-icons";
  import { useDispatch, useSelector } from "react-redux";
  import { removeFromFav } from "../redux/FavReducer";
  
  const FavScreen = () => {
    const favourites = useSelector((state) => state.favourites.favourites);
    const dispatch = useDispatch();
  
    const deleteItem = (item) => {
      dispatch(removeFromFav(item));
    };
  
    if (favourites.length === 0) {
      return (
        <View style={styles.emptyListContainer}>
          <Text style={styles.emptyListText}>Your Favourites List is Empty</Text>
        </View>
      );
    }
  
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Your Favourites Items</Text>
  
        {favourites.map((item, index) => (
          <View style={styles.itemContainer} key={index}>
            <Image
              style={styles.itemImage}
              source={{ uri: item.image }}
            />
            <View style={styles.itemDetails}>
              <Text style={styles.itemTitle} numberOfLines={2}>
                {item.title}
              </Text>
              <Text style={styles.itemPrice}>{item.price}</Text>
              {/* <Text style={styles.itemRating}>{item.rating.rate} ratings</Text> */}
            </View>
            <View style={styles.actionsContainer}>
              <Pressable style={styles.actionButton} onPress={() => deleteItem(item)}>
                <AntDesign name="delete" size={20} color="black" />
                <Text style={styles.actionButtonText}>Delete</Text>
              </Pressable>
            </View>
          </View>
        ))}
      </ScrollView>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flexGrow: 1,
      backgroundColor: "black",
      paddingVertical: 20,
      paddingHorizontal: 10,
    },
    title: {
      fontSize: 24,
      fontWeight: "bold",
      color: "white",
      textAlign: "center",
      marginBottom: 20,
    },
    itemContainer: {
      backgroundColor: "white",
      marginBottom: 20,
      padding: 10,
      flexDirection: "row",
      alignItems: "center",
      borderRadius: 10,
    },
    itemImage: {
      width: 100,
      height: 100,
      resizeMode: "cover",
      borderRadius: 10,
    },
    itemDetails: {
      flex: 1,
      marginLeft: 10,
    },
    itemTitle: {
      fontSize: 18,
      fontWeight: "bold",
      marginBottom: 5,
    },
    itemPrice: {
      fontSize: 16,
      color: "#888",
      marginBottom: 5,
    },
    itemRating: {
      fontSize: 14,
      color: "orange",
    },
    actionsContainer: {
      justifyContent: "center",
      alignItems: "center",
    },
    actionButton: {
      backgroundColor: "#FFC72C",
      paddingVertical: 8,
      paddingHorizontal: 12,
      borderRadius: 5,
      flexDirection: "row",
      alignItems: "center",
    },
    actionButtonText: {
      marginLeft: 5,
      color: "black",
    },
    emptyListContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "black",
    },
    emptyListText: {
      fontSize: 20,
      color: "white",
    },
  });
  
  export default FavScreen;
  