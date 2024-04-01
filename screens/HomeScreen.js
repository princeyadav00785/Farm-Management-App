import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Platform,
  ScrollView,
  Pressable,
  TextInput,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect, useCallback, useContext } from "react";
import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { SliderBox } from "react-native-image-slider-box";
import axios from "axios";
import ProductItem from "../components/ProductItem";
import DropDownPicker from "react-native-dropdown-picker";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { BottomModal, SlideAnimation, ModalContent } from "react-native-modals";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserType } from "../UserContext";
import jwt_decode from "jwt-decode";
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from "../theme/theme";
import { LinearGradient } from "expo-linear-gradient";
import GradientBackground from "../components/GradientBackground";
import products from "../data.json";


const HomeScreen = () => {
  const list = [
    {
      id: "0",
      image: "https://m.media-amazon.com/images/I/41EcYoIZhIL._AC_SY400_.jpg",
      name: "Home",
    },
    {
      id: "1",
      image:
        "https://m.media-amazon.com/images/G/31/img20/Events/Jup21dealsgrid/blockbuster.jpg",
      name: "Deals",
    },
    {
      id: "3",
      image:
        "https://images-eu.ssl-images-amazon.com/images/I/31dXEvtxidL._AC_SX368_.jpg",
      name: "Electronics",
    },
    {
      id: "4",
      image:
        "https://m.media-amazon.com/images/G/31/img20/Events/Jup21dealsgrid/All_Icons_Template_1_icons_01.jpg",
      name: "Mobiles",
    },
    {
      id: "5",
      image:
        "https://m.media-amazon.com/images/G/31/img20/Events/Jup21dealsgrid/music.jpg",
      name: "Music",
    },
    {
      id: "6",
      image: "https://m.media-amazon.com/images/I/51dZ19miAbL._AC_SY350_.jpg",
      name: "Fashion",
    },
  ];
  const images = [
    "https://www.seedbasket.in/image/cache/catalog/Home-Sliders/banner-cc1-1130x360-0.png",
    "https://www.seedbasket.in/image/cache/catalog/Home-Sliders/banner-cc2-1130x360-0.png",
    "https://www.seedbasket.in/image/cache/catalog/Home-Sliders/HS11-1130x360-0.jpg",
    "https://www.seedbasket.in/image/cache/catalog/Home-Sliders/slide-222-1130x360-0.jpg"
  ];

  const deals = [
    {
      id: "20",
      title: "Tomato Non Hybrid (400+ Seeds)",
      oldPrice: 40,
      price: 30,
      image:
        "https://www.seedbasket.in/image/cache/catalog/Updated%20Images/Tomato-200x200-0.png",
      carouselImages: [
        "https://www.seedbasket.in/image/cache/catalog/Updated%20Images/Tomato-200x200-0.png",
      ],
      color: "Red",
      size: "Small",
      description: "Fresh tomato seeds suitable for home gardening.",
      rating: 4.5,
      harvestingTime: "60-80 days",
      storageInstructions:
        "Store in a cool, dry place away from direct sunlight.",
    },
    {
      id: "30",
      title: "Palak/Spinach (400+ Seeds)",
      oldPrice: 40,
      price: 30,
      image:
        "https://www.seedbasket.in/image/cache/catalog/Spinach-200x200-0.png",
      carouselImages: [
        "https://www.seedbasket.in/image/cache/catalog/Spinach-200x200-0.png",
      ],
      color: "Green",
      size: "Medium",
      description: "High-quality spinach seeds for your garden.",
      rating: 4.2,
      harvestingTime: "30-40 days",
      storageInstructions: "Keep in a plastic bag in the refrigerator.",
    },
    {
      id: "40",
      title: "Amaranth Green(Thotakura) (1400+ Seeds)",
      oldPrice: 40,
      price: 30,
      image:
        "https://www.seedbasket.in/image/cache/catalog/Amaranth-Green-200x200-0.png",
      carouselImages: [
        "https://www.seedbasket.in/image/cache/catalog/Amaranth-Green-200x200-0.png",
      ],
      color: "Purple",
      size: "Large",
      description: "Fresh amaranth seeds suitable for large-scale cultivation.",
      rating: 4.8,
      harvestingTime: "40-50 days",
      storageInstructions: "Keep in a dry, well-ventilated area.",
    },
    {
      id: "40",
      title: "Coriander (300+ Seeds)",
      oldPrice: 40,
      price: 30,
      image:
        "https://www.seedbasket.in/image/cache/catalog/Coriander-200x200-0.png",
      carouselImages: [
        "https://www.seedbasket.in/image/cache/catalog/Coriander-200x200-0.png",
      ],
      color: "Brown",
      size: "Small",
      description: "Premium coriander seeds for culinary use.",
      rating: 4.4,
      harvestingTime: "25-45 days",
      storageInstructions:
        "Store in an airtight container in the refrigerator.",
    },
    {
      id: "40",
      title: "Chukka Kura (250+ Seeds)",
      oldPrice: 40,
      price: 30,
      image:
        "https://www.seedbasket.in/image/cache/catalog/chukkakura-200x200-0.png",
      carouselImages: [
        "https://www.seedbasket.in/image/cache/catalog/chukkakura-200x200-0.png",
      ],
      color: "Dark Green",
      size: "Medium",
      description: "High-yield chukka kura seeds for your garden.",
      rating: 4.6,
      harvestingTime: "30-45 days",
      storageInstructions: "Keep in a cool, dark place.",
    },
    {
      id: "40",
      title: "Microgreen Amaranthus Seeds (100 Grms)",
      oldPrice: 180,
      price: 120,
      image:
        "https://www.seedbasket.in/image/cache/catalog/Products/MicroGreens/Amaranth-Microgreens-200x200-0.JPG",
      carouselImages: [
        "https://www.seedbasket.in/image/cache/catalog/Products/MicroGreens/Amaranth-Microgreens-200x200-0.JPG",
      ],
      color: "Red",
      size: "Small",
      description: "Fresh microgreen amaranthus seeds for home cultivation.",
      rating: 4.7,
      harvestingTime: "10-14 days",
      storageInstructions: "Sprinkle with water and cover with a plastic dome.",
    },
  ];

  const offers = [
    {
      id: "2",
      title: "Plant Care Kit (Pack of 4) Natural and Organic",
      oldPrice: 880,
      price: 635,
      carouselImages: [
        "https://www.seedbasket.in/image/cache/catalog/Products/Kits/Organic-plant-Nutrient-Kit-200x200-0.png",
      ],
      color: "Natural",
      size: "Standard",
      description:
        "Complete plant care kit containing natural and organic products.",
      rating: 4.7,
      harvestingTime: "Varies by plant type",
      storageInstructions: "Store in a cool, dry place.",
      image:
        "https://www.seedbasket.in/image/cache/catalog/Products/Kits/Organic-plant-Nutrient-Kit-200x200-0.png",
      offer: Math.round(((880 - 635) / 635) * 100),
    },
    {
      id: "3",
      title: "Little Gardeners Kit for Kids",
      oldPrice: 199,
      price: 129,
      carouselImages: [
        "https://www.seedbasket.in/image/cache/catalog/Products/Kits/IMG-20240309-WA0046-200x200-0.jpg",
      ],
      color: "Multicolor",
      size: "Kids",
      description: "Engaging gardening kit designed specifically for kids.",
      rating: 4.8,
      harvestingTime: "N/A",
      storageInstructions: "Keep away from direct sunlight.",
      image:
        "https://www.seedbasket.in/image/cache/catalog/Products/Kits/IMG-20240309-WA0046-200x200-0.jpg",
      offer: Math.round(((199 - 129) / 149) * 100),
    },
    {
      id: "4",
      title: "Bhendi/Okra Non-Hybrid (80 Seeds)",
      oldPrice: 40,
      price: 30,
      carouselImages: [
        "https://www.seedbasket.in/image/cache/catalog/Products/Non%20Hybrid/Bhendi-200x200-0.png",
      ],
      color: "Green",
      size: "Standard",
      description:
        "High-quality non-hybrid okra seeds suitable for home gardening.",
      rating: 4.5,
      harvestingTime: "60-70 days",
      storageInstructions: "Keep seeds in a dry place.",
      image:
        "https://www.seedbasket.in/image/cache/catalog/Products/Non%20Hybrid/Bhendi-200x200-0.png",
      offer: Math.round(((40 - 30) / 40) * 100),
    },
    {
      id: "5",
      title: "White Bitter Gourd (30 Seeds)",
      oldPrice: 50,
      price: 30,
      carouselImages: [
        "https://www.seedbasket.in/image/cache/catalog/Products/Non%20Hybrid/BitterGourd-White-200x200-0.png",
      ],
      color: "White",
      size: "Standard",
      description: "Premium quality white bitter gourd seeds for cultivation.",
      rating: 4.2,
      harvestingTime: "60-70 days",
      storageInstructions: "Keep seeds in a cool, dry place.",
      image:
        "https://www.seedbasket.in/image/cache/catalog/Products/Non%20Hybrid/BitterGourd-White-200x200-0.png",
      offer: Math.round(((50 - 30) / 30) * 100),
    },
    {
      id: "6",
      title: "Tomato Non Hybrid (400+ Seeds)",
      oldPrice: 40,
      price: 30,
      carouselImages: [
        "https://www.seedbasket.in/image/cache/catalog/Updated%20Images/Tomato-200x200-0.png",
      ],
      color: "Red",
      size: "Standard",
      description: "Fresh tomato seeds suitable for home gardening.",
      rating: 4.6,
      harvestingTime: "60-80 days",
      storageInstructions: "Keep seeds in a warm place.",
      image:
        "https://www.seedbasket.in/image/cache/catalog/Updated%20Images/Tomato-200x200-0.png",
      offer: Math.round(((40 - 30) / 40) * 100),
    },
    {
      id: "7",
      title: "Palak/Spinach (400+ Seeds)",
      oldPrice: 48,
      price: 30,
      carouselImages: [
        "https://www.seedbasket.in/image/cache/catalog/Spinach-200x200-0.png",
      ],
      color: "Green",
      size: "Standard",
      description: "High-quality spinach seeds for your garden.",
      rating: 4.4,
      harvestingTime: "30-40 days",
      storageInstructions: "Keep seeds moist until germination.",
      image:
        "https://www.seedbasket.in/image/cache/catalog/Spinach-200x200-0.png",
      offer: Math.round(((48 - 30) / 40) * 100),
    },
    {
      id: "8",
      title: "Amaranth Green (Thotakura) (1400+ Seeds)",
      oldPrice: 45,
      price: 30,
      carouselImages: [
        "https://www.seedbasket.in/image/cache/catalog/Amaranth-Green-200x200-0.png",
      ],
      color: "Green",
      size: "Standard",
      description: "High-yield amaranth green seeds suitable for cultivation.",
      rating: 4.7,
      harvestingTime: "60-80 days",
      storageInstructions: "Store in a cool, dry place.",
      image:
        "https://www.seedbasket.in/image/cache/catalog/Amaranth-Green-200x200-0.png",
      offer: Math.round(((45 - 30) / 40) * 100),
    },
    {
      id: "9",
      title: "Coriander (300+ Seeds)",
      oldPrice: 40,
      price: 30,
      carouselImages: [
        "https://www.seedbasket.in/image/cache/catalog/Coriander-200x200-0.png",
      ],
      color: "Brown",
      size: "Standard",
      description: "Premium coriander seeds for culinary use.",
      rating: 4.3,
      harvestingTime: "30-45 days",
      storageInstructions: "Keep seeds in a dry, airtight container.",
      image:
        "https://www.seedbasket.in/image/cache/catalog/Coriander-200x200-0.png",
      offer: Math.round(((40 - 30) / 40) * 100),
    },
    {
      id: "10",
      title: "Chukka Kura (250+ Seeds)",
      oldPrice: 49,
      price: 30,
      carouselImages: [
        "https://www.seedbasket.in/image/cache/catalog/chukkakura-200x200-0.png",
      ],
      color: "Dark Green",
      size: "Standard",
      description: "High-quality chukka kura seeds for your garden.",
      rating: 4.5,
      harvestingTime: "40-50 days",
      storageInstructions: "Keep seeds in a dry place.",
      image:
        "https://www.seedbasket.in/image/cache/catalog/chukkakura-200x200-0.png",
      offer: Math.round(((49 - 30) / 40) * 100),
    },
  ];

  // const [products, setProducts] = useState([]);
  const navigation = useNavigation();
  const [open, setOpen] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [category, setCategory] = useState("Exotic Seeds");
  const { userId, setUserId } = useContext(UserType);
  const [Company, setCompanyOpen] = useState(true);
  const [selectedAddress, setSelectedAdress] = useState("");

  const [items, setItems] = useState([
    { label: "Herbal Seeds", value: "Herbal Seeds" },
    { label: "Exotic Seeds", value: "Exotic Seeds" },
    { label: "Vegetable Seeds", value: "Vegetable Seeds" },
  ]);

  const onGenderOpen = useCallback(() => {
    setCompanyOpen(false);
  }, []);

  const cart = useSelector((state) => state.cart.cart);
  const [modalVisible, setModalVisible] = useState(false);
  useEffect(() => {
    if (userId) {
      fetchAddresses();
    }
  }, [userId, modalVisible]);
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
  useEffect(() => {
    const fetchUser = async () => {
      const token = await AsyncStorage.getItem("authToken");
      const decodedToken = jwt_decode(token);
      const userId = decodedToken.userId;
      setUserId(userId);
    };

    fetchUser();
  }, []);

  return (
    <>
      <SafeAreaView
        style={{
          paddingTop: Platform.OS === "android" ? 0 : 0,
          flex: 1,
          backgroundColor: "white",
        }}
      >
        <FlatList
          data={[{ key: "content" }]} // Add dummy data as FlatList requires data prop
          renderItem={() => (
            <>
              <View style={{ padding: 10, backgroundColor: "black" }}>
                <Text
                  style={{
                    fontSize: 36,
                    fontWeight: "bold",
                    color: "white",
                    marginLeft: 40,
                    lineHeight: 50,
                  }}
                >
                  Find the best {"\n"}
                  seeds for you
                </Text>
              </View>
              <View>
                <View
                  style={{
                    backgroundColor: "black",
                    padding: 10,
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Pressable
                    onPress={() => {
                      setModalVisible(false);
                      navigation.navigate("Search");
                    }}
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      marginHorizontal: 9,
                      gap: 10,
                      backgroundColor: "white",
                      borderRadius: 12,
                      height: 50,
                      flex: 1,
                      padding: 15,
                      backgroundColor: "#333333",
                      color: "white",
                    }}
                  >
                    <AntDesign
                      style={{ paddingLeft: 20, paddingRight: 10 }}
                      name="search1"
                      size={22}
                      color="black"
                    />
                    <TextInput
                      style={{ color: "white" }}
                      placeholder="Find Your Seeds"
                      placeholderTextColor="#F6F6F6"
                    />
                  </Pressable>

                  <Feather name="mic" size={24} color="black" />
                </View>

                <Pressable
                  onPress={() => setModalVisible(!modalVisible)}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 5,
                    padding: 20,
                    backgroundColor: "black",
                    color: "white",
                    // marginLeft:40,
                  }}
                >
                  <Ionicons
                    style={{ marginLeft: 20, marginRight: 10 }}
                    name="location-outline"
                    size={24}
                    color="white"
                  />

                  <Pressable>
                    {selectedAddress ? (
                      <Text>
                        Deliver to {selectedAddress?.name} -{" "}
                        {selectedAddress?.street}
                      </Text>
                    ) : (
                      <Text
                        style={{
                          fontSize: 18,
                          fontWeight: "500",
                          color: "white",
                        }}
                      >
                        Add a Address
                      </Text>
                    )}
                  </Pressable>

                  <MaterialIcons
                    name="keyboard-arrow-down"
                    size={24}
                    color="black"
                  />
                </Pressable>

                <FlatList horizontal showsHorizontalScrollIndicator={false}>
                  {list.map((item, index) => (
                    <Pressable
                      key={index}
                      style={{
                        margin: 10,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Image
                        style={{ width: 50, height: 50, resizeMode: "contain" }}
                        source={{ uri: item.image }}
                      />

                      <Text
                        style={{
                          textAlign: "center",
                          fontSize: 12,
                          fontWeight: "500",
                          marginTop: 5,
                        }}
                      >
                        {item?.name}
                      </Text>
                    </Pressable>
                  ))}
                </FlatList>

                <SliderBox
                  images={images}
                  autoPlay
                  circleLoop
                  dotColor={"#13274F"}
                  inactiveDotColor="#90A4AE"
                  ImageComponentStyle={{ width: "100%" }}
                />

                <View style={styles.clr}>
                  <Text
                    style={{
                      marginTop: 30,
                      padding: 10,
                      fontSize: 24,
                      fontWeight: "bold",
                      color: "white",
                    }}
                  >
                    Trending Deals of the week
                  </Text>

                  <View
                    style={{
                      flexDirection: "row",
                      flexWrap: "wrap",
                      justifyContent: "space-between",
                      paddingHorizontal: 10,
                      marginBottom: 20,
                    }}
                  >
                    {deals.map((item, index) => (
                      <Pressable
                        key={index}
                        onPress={() =>
                          navigation.navigate("Info", {
                            id: item.id,
                            title: item.title,
                            oldPrice: item?.oldPrice,
                            price: item?.price,
                            carouselImages: item.carouselImages,
                            color: item?.color,
                            size: item?.size,
                            oldPrice: item?.oldPrice,
                            item: item,
                            description: item.description,
                            rating: item.rating,
                            harvestingTime: item.harvestingTime,
                            storageInstructions: item.storageInstructions,
                          })
                        }
                        style={{
                          width: "48%",
                          backgroundColor: "#333333", 
                          borderRadius: 10,
                          overflow: "hidden", 
                          marginBottom: 10, 
                          elevation: 5,
                        }}
                      >
                        <View style={{ backgroundColor: "white" }}>
                          <Image
                            style={{
                              width: "100%",
                              height: 180,
                              resizeMode: "cover", 
                              borderTopLeftRadius: 10,
                              borderTopRightRadius: 10,
                            }}
                            source={{ uri: item?.image }}
                          />
                        </View>
                        <View style={{ padding: 10 }}>
                          <Text
                            style={{
                              fontSize: 16,
                              fontWeight: "bold",
                              color: "white",
                              height: 52,
                              overflow: "hidden",
                            }}
                          >
                            {item.title}
                          </Text>
                          <Text
                            style={{
                              fontSize: 14,
                              color: "white",
                              marginBottom: 5,
                            }}
                          >
                            Daily Price: Rs.{item.oldPrice}
                          </Text>
                          <Text
                            style={{
                              fontSize: 14,
                              color: "white",
                              marginBottom: 10,
                            }}
                          >
                            Deal's Price: Rs.{item.price}
                          </Text>
                          <TouchableOpacity
                            onPress={() =>
                              navigation.navigate("Info", {
                                id: item.id,
                                title: item.title,
                                price: item?.price,
                                carouselImages: item.carouselImages,
                                color: item?.color,
                                size: item?.size,
                                oldPrice: item?.oldPrice,
                                item: item,
                              })
                            }
                            style={{
                              backgroundColor: "#F44336",
                              borderRadius: 50,
                              paddingVertical: 8,
                              alignItems: "center",
                            }}
                          >
                            <Text style={{ color: "#FFFFFF", fontSize: 14 }}>
                              View Details
                            </Text>
                          </TouchableOpacity>
                        </View>
                      </Pressable>
                    ))}
                  </View>

                  <Text
                    style={{
                      height: 0,
                      borderColor: "#D0D0D0",
                      // borderWidth: 2,
                      marginTop: 25,
                    }}
                  />

                  <Text
                    style={{
                      padding: 10,
                      fontSize: 28,
                      fontWeight: "bold",
                      color: "white",
                    }}
                  >
                    Today's Deals
                  </Text>

                  <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {offers.map((item, index) => (
                      <Pressable
                        key={index}
                        onPress={() =>
                          navigation.navigate("Info", {
                            oldPrice: item?.oldPrice,
                            price: item?.price,
                            carouselImages: item.carouselImages,
                            color: item?.color,
                            size: item?.size,
                            oldPrice: item?.oldPrice,
                            item: item,
                            description: item.description,
                            rating: item.rating,
                            harvestingTime: item.harvestingTime,
                            storageInstructions: item.storageInstructions,
                          })
                        }
                        style={{
                          padding: 10,
                          marginVertical: 10,
                          // alignItems: "center",
                          // justifyContent: "space-between",
                          width: "10%",
                          marginLeft: 10,
                          marginBottom: 10,
                          alignItems: "center",
                          shadowColor: "white", // Shadow color
                          shadowOffset: {
                            width: 0,
                            height: 2,
                          },
                          shadowOpacity: 0.25, // Shadow opacity
                          shadowRadius: 3.84, // Shadow radius (iOS)
                          elevation: 5, // Elevation (Android)
                          backgroundColor: "#333333", // Add a background color to show shadow
                          borderRadius: 8, // Optional: Add borderRadius for rounded corners
                        }}
                      >
                        <Image
                          style={{
                            width: 150,
                            height: 150,
                            resizeMode: "contain",
                          }}
                          source={{ uri: item?.image }}
                        />
                        <Text
                          style={{
                            textAlign: "center",
                            color: "white",
                            fontSize: 13,
                            fontWeight: "bold",
                            marginBottom: 10,
                          }}
                        >
                          {item?.title}
                        </Text>
                        <View
                          style={{
                            backgroundColor: "#E31837",
                            paddingVertical: 5,
                            width: 130,
                            justifyContent: "center",
                            alignItems: "center",
                            marginTop: 10,
                            borderRadius: 4,
                          }}
                        >
                          <Text
                            style={{
                              textAlign: "center",
                              color: "white",
                              fontSize: 13,
                              fontWeight: "bold",
                              marginBottom: 10,
                            }}
                          >
                            Upto {item?.offer} % off
                          </Text>
                        </View>
                      </Pressable>
                    ))}
                  </ScrollView>
                </View>
                {/* </LinearGradient> */}
                {/* Border */}
                <Text
                  style={{
                    height: 0,
                    borderColor: "black",
                    // borderWidth: 2,
                    // marginTop: 15,
                  }}
                />
                <View style={{ backgroundColor: "black" }}>
                  <Text
                    style={{
                      color: "white",
                      marginTop: 20,
                      marginLeft: 20,
                      fontSize: 24,
                      fontWeight: "bold",
                    }}
                  >
                    Select Category
                  </Text>
                </View>
                <View
                  //  style={styles.container}
                  style={{ backgroundColor: "black" }}
                >
                  <View
                    style={{
                      marginHorizontal: 10,
                      marginTop: 20,
                      width: "45%",
                      marginBottom: open ? 60 : 15,
                    }}
                  >
                    <DropDownPicker
                      style={{
                        borderColor: "white",
                        height: 30,
                        marginBottom: open ? 120 : 15,
                      }}
                      open={open}
                      value={category} //genderValue
                      items={items}
                      setOpen={setOpen}
                      setValue={setCategory}
                      setItems={setItems}
                      placeholder="choose category"
                      placeholderStyle={styles.placeholderStyles}
                      onOpen={onGenderOpen}
                      zIndex={3000}
                      zIndexInverse={1000}
                    />
                  </View>
                  {/* Filtered products  */}


                  <View
                    vertical
                    showsVerticalScrollIndicator={false}
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      flexWrap: "wrap",
                    }}
                  >
{products
    ?.filter((item) => item.category == category)
    .map((item, index) => {
      
        return (
            <TouchableOpacity
                key={index}
                onPress={() =>
                    navigation.navigate("ProductInfo", {
                        price: item?.price,
                        carouselImages: item.carouselImages,
                        color: item?.color,
                        size: item?.size,
                        oldPrice: item?.oldPrice,
                        item: item,
                        description: item.description,
                        rating: item.rating,
                        harvestingTime: item.harvestingTime,
                        storageInstructions: item.storageInstructions,
                    })
                }
                style={{
                    marginBottom: 10,
                    width: "48%",
                    alignItems: "center",
                    shadowColor: "#000",
                    shadowOffset: {
                        width: 0,
                        height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                    elevation: 5,
                    backgroundColor: "#333333",
                    borderRadius: 8,
                }}
            >
                <ProductItem item={item} key={index} />
            </TouchableOpacity>
        );
    })
}


                  </View>
                </View>
              </View>

              <BottomModal
                onBackdropPress={() => setModalVisible(!modalVisible)}
                swipeDirection={["up", "down"]}
                swipeThreshold={200}
                modalAnimation={
                  new SlideAnimation({
                    slideFrom: "bottom",
                  })
                }
                onHardwareBackPress={() => setModalVisible(!modalVisible)}
                visible={modalVisible}
                onTouchOutside={() => setModalVisible(!modalVisible)}
              >
                <ModalContent
                  style={{
                    width: "100%",
                    height: 350,
                    backgroundColor: "gray",
                  }}
                >
                  <View style={{ marginBottom: 8 }}>
                    <Text
                      style={{
                        fontSize: 22,
                        fontWeight: "bold",
                        color: "white",
                      }}
                    >
                      Choose your Location
                    </Text>

                    <Text
                      style={{ marginTop: 5, fontSize: 20, color: "white" }}
                    >
                      Select a delivery location to see product availabilty and
                      delivery options
                    </Text>
                  </View>

                  <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {/* already added addresses */}
                    {addresses?.map((item, index) => (
                      <Pressable
                        key={index}
                        onPress={() => setSelectedAdress(item)}
                        style={{
                          width: 140,
                          height: 140,
                          borderColor: "#D0D0D0",
                          borderWidth: 1,
                          padding: 10,
                          justifyContent: "center",
                          alignItems: "center",
                          gap: 3,
                          marginRight: 15,
                          marginTop: 10,
                          backgroundColor:
                            selectedAddress === item ? "#FBCEB1" : "white",
                        }}
                      >
                        <View
                          style={{
                            flexDirection: "row",
                            alignItems: "center",
                            gap: 3,
                          }}
                        >
                          <Text style={{ fontSize: 13, fontWeight: "bold" }}>
                            {item?.name}
                          </Text>
                          <Entypo name="location-pin" size={24} color="red" />
                        </View>

                        <Text
                          numberOfLines={1}
                          style={{
                            width: 130,
                            fontSize: 13,
                            textAlign: "center",
                          }}
                        >
                          {item?.houseNo},{item?.landmark}
                        </Text>

                        <Text
                          numberOfLines={1}
                          style={{
                            width: 130,
                            fontSize: 13,
                            textAlign: "center",
                          }}
                        >
                          {item?.street}
                        </Text>
                        <Text
                          numberOfLines={1}
                          style={{
                            width: 130,
                            fontSize: 13,
                            textAlign: "center",
                          }}
                        >
                          India, Bangalore
                        </Text>
                      </Pressable>
                    ))}

                    <Pressable
                      onPress={() => {
                        setModalVisible(false);
                        navigation.navigate("Address");
                      }}
                      style={{
                        width: 140,
                        height: 140,
                        borderColor: "#D0D0D0",
                        marginTop: 10,
                        borderWidth: 1,
                        padding: 10,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Text
                        style={{
                          textAlign: "center",
                          color: "#0066b2",
                          fontWeight: "500",
                        }}
                      >
                        Add an Address or pick-up point
                      </Text>
                    </Pressable>
                  </ScrollView>

                  <View
                    style={{
                      flexDirection: "column",
                      gap: 7,
                      marginBottom: 30,
                    }}
                  >
                  </View>
                </ModalContent>
              </BottomModal>
            </>
          )}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
        />
      </SafeAreaView>
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  Containerhead: {
    padding: 20, // Add padding for better readability
    backgroundColor: "#FFFFFF",
  },
  header: {
    marginLeft: 30,
    textAlign: "left", // Align text to the center
    fontSize: 38, // Adjust font size as needed
    lineHeight: 24, // Adjust line height as needed
  },
  clr: {
    backgroundColor: "black", // Fallback color in case gradients are not supported
    background: "linear-gradient(135deg, #4CAF50 0%, #2E7D32 100%)",
  },

  text: {
    fontSize: 20,
    color: "#FFFFFF", 
  },
  CartItemLinearGradient: {
    flex: 1,
    gap: SPACING.space_12,
    padding: SPACING.space_12,
  },
});
