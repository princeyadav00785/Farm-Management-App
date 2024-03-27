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
    "https://images.unsplash.com/photo-1509814741693-902b8af25f95?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1478029115463-6371b5133cac?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1572851898951-4075ed48c0ce?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MTR8NzgyMTIzfHxlbnwwfHx8fHw%3D",
  ];
  const deals = [
    {
      id: "20",
      title: "OnePlus Nord CE 3 Lite 5G (Pastel Lime, 8GB RAM, 128GB Storage)",
      oldPrice: 25000,
      price: 19000,
      image:
        "https://images.unsplash.com/photo-1555269030-32ab00051c67?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      carouselImages: [
        "https://m.media-amazon.com/images/I/61QRgOgBx0L._SX679_.jpg",
        "https://m.media-amazon.com/images/I/61uaJPLIdML._SX679_.jpg",
        "https://m.media-amazon.com/images/I/510YZx4v3wL._SX679_.jpg",
        "https://m.media-amazon.com/images/I/61J6s1tkwpL._SX679_.jpg",
      ],
      color: "Stellar Green",
      size: "6 GB RAM 128GB Storage",
    },
    {
      id: "30",
      title:
        "Samsung Galaxy S20 FE 5G (Cloud Navy, 8GB RAM, 128GB Storage) with No Cost EMI & Additional Exchange Offers",
      oldPrice: 74000,
      price: 26000,
      image:
        "https://images-eu.ssl-images-amazon.com/images/G/31/img23/Wireless/Samsung/SamsungBAU/S20FE/GW/June23/BAU-27thJune/xcm_banners_2022_in_bau_wireless_dec_s20fe-rv51_580x800_in-en.jpg",
      carouselImages: [
        "https://m.media-amazon.com/images/I/81vDZyJQ-4L._SY879_.jpg",
        "https://m.media-amazon.com/images/I/61vN1isnThL._SX679_.jpg",
        "https://m.media-amazon.com/images/I/71yzyH-ohgL._SX679_.jpg",
        "https://m.media-amazon.com/images/I/61vN1isnThL._SX679_.jpg",
      ],
      color: "Cloud Navy",
      size: "8 GB RAM 128GB Storage",
    },
    {
      id: "40",
      title:
        "Samsung Galaxy M14 5G (ICY Silver, 4GB, 128GB Storage) | 50MP Triple Cam | 6000 mAh Battery | 5nm Octa-Core Processor | Android 13 | Without Charger",
      oldPrice: 16000,
      price: 14000,
      image:
        "https://images-eu.ssl-images-amazon.com/images/G/31/img23/Wireless/Samsung/CatPage/Tiles/June/xcm_banners_m14_5g_rv1_580x800_in-en.jpg",
      carouselImages: [
        "https://m.media-amazon.com/images/I/817WWpaFo1L._SX679_.jpg",
        "https://m.media-amazon.com/images/I/81KkF-GngHL._SX679_.jpg",
        "https://m.media-amazon.com/images/I/61IrdBaOhbL._SX679_.jpg",
      ],
      color: "Icy Silver",
      size: "6 GB RAM 64GB Storage",
    },
    {
      id: "40",
      title:
        "realme narzo N55 (Prime Blue, 4GB+64GB) 33W Segment Fastest Charging | Super High-res 64MP Primary AI Camera",
      oldPrice: 12999,
      price: 10999,
      image:
        "https://images-eu.ssl-images-amazon.com/images/G/31/tiyesum/N55/June/xcm_banners_2022_in_bau_wireless_dec_580x800_v1-n55-marchv2-mayv3-v4_580x800_in-en.jpg",
      carouselImages: [
        "https://m.media-amazon.com/images/I/41Iyj5moShL._SX300_SY300_QL70_FMwebp_.jpg",
        "https://m.media-amazon.com/images/I/61og60CnGlL._SX679_.jpg",
        "https://m.media-amazon.com/images/I/61twx1OjYdL._SX679_.jpg",
      ],
    },
  ];
  const offers = [
    {
      id: "0",
      title:
        "Oppo Enco Air3 Pro True Wireless in Ear Earbuds with Industry First Composite Bamboo Fiber, 49dB ANC, 30H Playtime, 47ms Ultra Low Latency,Fast Charge,BT 5.3 (Green)",
      offer: "72% off",
      oldPrice: 7500,
      price: 4500,
      image:
        "https://m.media-amazon.com/images/I/61a2y1FCAJL._AC_UL640_FMwebp_QL65_.jpg",
      carouselImages: [
        "https://m.media-amazon.com/images/I/61a2y1FCAJL._SX679_.jpg",
        "https://m.media-amazon.com/images/I/71DOcYgHWFL._SX679_.jpg",
        "https://m.media-amazon.com/images/I/71LhLZGHrlL._SX679_.jpg",
        "https://m.media-amazon.com/images/I/61Rgefy4ndL._SX679_.jpg",
      ],
      color: "Green",
      size: "Normal",
    },
    {
      id: "1",
      title:
        "Fastrack Limitless FS1 Pro Smart Watch|1.96 Super AMOLED Arched Display with 410x502 Pixel Resolution|SingleSync BT Calling|NitroFast Charging|110+ Sports Modes|200+ Watchfaces|Upto 7 Days Battery",
      offer: "40%",
      oldPrice: 7955,
      price: 3495,
      image: "https://m.media-amazon.com/images/I/41mQKmbkVWL._AC_SY400_.jpg",
      carouselImages: [
        "https://m.media-amazon.com/images/I/71h2K2OQSIL._SX679_.jpg",
        "https://m.media-amazon.com/images/I/71BlkyWYupL._SX679_.jpg",
        "https://m.media-amazon.com/images/I/71c1tSIZxhL._SX679_.jpg",
      ],
      color: "black",
      size: "Normal",
    },
    {
      id: "2",
      title: "Aishwariya System On Ear Wireless On Ear Bluetooth Headphones",
      offer: "40%",
      oldPrice: 7955,
      price: 3495,
      image: "https://m.media-amazon.com/images/I/41t7Wa+kxPL._AC_SY400_.jpg",
      carouselImages: ["https://m.media-amazon.com/images/I/41t7Wa+kxPL.jpg"],
      color: "black",
      size: "Normal",
    },
    {
      id: "3",
      title:
        "Fastrack Limitless FS1 Pro Smart Watch|1.96 Super AMOLED Arched Display with 410x502 Pixel Resolution|SingleSync BT Calling|NitroFast Charging|110+ Sports Modes|200+ Watchfaces|Upto 7 Days Battery",
      offer: "40%",
      oldPrice: 24999,
      price: 19999,
      image: "https://m.media-amazon.com/images/I/71k3gOik46L._AC_SY400_.jpg",
      carouselImages: [
        "https://m.media-amazon.com/images/I/41bLD50sZSL._SX300_SY300_QL70_FMwebp_.jpg",
        "https://m.media-amazon.com/images/I/616pTr2KJEL._SX679_.jpg",
        "https://m.media-amazon.com/images/I/71wSGO0CwQL._SX679_.jpg",
      ],
      color: "Norway Blue",
      size: "8GB RAM, 128GB Storage",
    },
  ];
  const [products, setProducts] = useState([]);
  const navigation = useNavigation();
  const [open, setOpen] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [category, setCategory] = useState("jewelery");
  const { userId, setUserId } = useContext(UserType);
  const [Company, setCompanyOpen] = useState(true);
  const [selectedAddress, setSelectedAdress] = useState("");
  console.log(selectedAddress);
  const [items, setItems] = useState([
    { label: "Men's clothing", value: "men's clothing" },
    { label: "jewelery", value: "jewelery" },
    { label: "electronics", value: "electronics" },
    { label: "women's clothing", value: "women's clothing" },
  ]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://fakestoreapi.com/products");
        setProducts(response.data);
        // console.log(response.data);
      } catch (error) {
        console.log("error message", error);
      }
    };

    fetchData();
  }, []);
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
        `http://192.168.92.200:8000/addresses/${userId}`
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
  console.log("address", addresses);
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

                {/* <LinearGradient
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 1}}
                  colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}
                  // style={styles.CartItemLinearGradient}
                > */}
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
                      justifyContent: "space-between", // Align cards evenly
                      paddingHorizontal: 10, // Add horizontal padding
                      marginBottom: 20, // Add bottom margin for spacing between rows
                    }}
                  >
                    {deals.map((item, index) => (
                      <Pressable
                        key={index}
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
                          width: "48%",
                          backgroundColor: "#333333", // Card background color
                          borderRadius: 10,
                          overflow: "hidden", // Clip overflow content
                          marginBottom: 10, // Add bottom margin for spacing between cards
                          elevation: 5,
                        }}
                      >
                        <View style={{ backgroundColor: "white" }}>
                          <Image
                            style={{
                              width: "100%",
                              height: 180,
                              resizeMode: "cover", // Use "cover" to fill the image container
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
                              backgroundColor: "#F44336", // Button background color
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
                          padding: 10,
                          marginVertical: 10,
                          // alignItems: "center",
                          // justifyContent: "space-between",
                          width: "20%",
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
                            Upto {item?.offer}
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
                  <Text style={{color:"white",marginTop:20, marginLeft:20,fontSize:24,fontWeight:"bold"}}>Select Category</Text>
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
                      // onChangeValue={onChange}
                      zIndex={3000}
                      zIndexInverse={1000}
                    />
                  </View>
                  {/* Filtered products  */}
                  {/* <GradientBackground> */}

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
                      ?.filter((item) => item.category === category)
                      .map((item, index) => (
                        <TouchableOpacity
                          key={index}
                          onPress={() => {
                            console.log(
                              "Navigating to Info screen with item:",
                              item
                            );
                            navigation.navigate("ProductInfo", {
                              id: item.id,
                              title: item.title,
                              price: item?.price,
                              carouselImages: item.image,
                              item: item,
                              description: item.description,
                            });
                          }}
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
                      ))}
                  </View>
                  {/* </GradientBackground> */}
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
                <ModalContent style={{ width: "100%", height: 350 ,backgroundColor:"gray"}}>
                  <View style={{ marginBottom: 8 }}>
                    <Text style={{ fontSize: 22, fontWeight:"bold" , color:"white"}}>
                      Choose your Location
                    </Text>

                    <Text style={{ marginTop: 5, fontSize: 20, color: "white" }}>
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
                    {/* <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 5,
                      }}
                    >
                      <Entypo name="location-pin" size={22} color="#0066b2" />
                      <Text style={{ color: "#0066b2", fontWeight: "400" }}>
                        Enter an Indian pincode
                      </Text>
                    </View>

                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 5,
                      }}
                    >
                      <Ionicons name="locate-sharp" size={22} color="#0066b2" />
                      <Text style={{ color: "#0066b2", fontWeight: "400" }}>
                        Use My Currect location
                      </Text>
                    </View>

                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 5,
                      }}
                    >
                      <AntDesign name="earth" size={22} color="#0066b2" />

                      <Text style={{ color: "#0066b2", fontWeight: "400" }}>
                        Deliver outside India
                      </Text>
                    </View> */}
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
    // backgroundColor: '#4CAF50', // Fallback color in case gradients are not supported
    // // Gradient background
    // background: 'linear-gradient(135deg, #4CAF50 0%, #2E7D32 100%)',
  },
  Containerhead: {
    // flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
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
    color: "#FFFFFF", // White text color
  },
  CartItemLinearGradient: {
    flex: 1,
    gap: SPACING.space_12,
    padding: SPACING.space_12,
    // borderRadius: BORDERRADIUS.radius_25,
  },
});
