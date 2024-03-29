import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Pressable, Dimensions, TouchableOpacity, ScrollView } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import ProductItem from '../components/ProductItem';
import products from "../data.json";

const SearchScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);

  // Function to handle text input changes and filter products based on the search query
  const handleSearch = (query) => {
    setSearchQuery(query);
    const filtered = products.filter((product) =>
      product.title.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  return (
    <ScrollView
      style={{
        backgroundColor: 'black',
        height: (Dimensions.get('window').width * 50) / 100,
      }}>
            <Text
        style={{
            // height: 100,
            padding:20,
            color: 'white',
            fontSize: 36,
            fontWeight: 'bold',
            fontFamily: 'Arial', // Change 'Arial' to your desired font family
            // fontVariant: ['small-caps'], // Add desired font variant
        }}>
        Search for the {'\n'}
        Suitable seeds
        </Text>
      <Pressable
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginHorizontal: 9,
          gap: 10,
          borderRadius: 12,
          height: 50,
          flex: 1,
          padding: 15,
          backgroundColor: '#333333',
          color: 'white',
          borderColor: 'white',
          marginBottom:50
        }}>
        <AntDesign
          style={{ paddingLeft: 20, paddingRight: 10 }}
          name="search1"
          size={22}
          color="white"
        />
        <TextInput
          style={{ color: 'white' }}
          placeholder="Find Your Seeds..."
          placeholderTextColor="white"
          onChangeText={handleSearch} // Call handleSearch function on text input change
          value={searchQuery} // Bind searchQuery to text input value
        />
      </Pressable>
      <View
        vertical
        showsVerticalScrollIndicator={false}
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
        }}>
        {filteredProducts.map((item, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => {
              console.log('Navigating to Info screen with item:', item);
              navigation.navigate('ProductInfo', {
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
              width: '48%',
              alignItems: 'center',
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 5,
              backgroundColor: '#333333',
              borderRadius: 8,
            }}>
            <ProductItem item={item} />
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

export default SearchScreen;
