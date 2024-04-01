import React, { useState } from 'react';
import axios from "axios";
import { View, Image, Button, Platform, Alert, Text, StyleSheet } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';

const SERVER_URL = 'http://192.168.1.200:5004/receive_string';

const ModelPage = () => {
  const [photo, setPhoto] = useState(null);
  const [verdict, setVerdict] = useState('');


  const handleChoosePhoto = () => {
    launchImageLibrary({ noData: true }, (response) => {
      if (response) {
        setPhoto(response);
      }
    });
  };

  const imageUpload = (imageUri) => {
    const newImageUri =  "file:///" + imageUri.assets[0].uri.split("file:/").join("");
    const imageData = new FormData()
    imageData.append("file", {
      uri: newImageUri,
      type: 'image/jpeg', // Assuming jpeg format, you might want to adjust according to your image type
      name: newImageUri.split("/").pop()
    })
    axios({
      method: 'post',
      url: 'http://192.168.7.200:8000/api/upload',
      data: imageData,
      headers: {
        'Content-Type': 'multipart/form-data', // Set Content-Type header
      }
    
    })
    .then(function (response) {
      console.log("Image upload successful", response.data.message);
      setVerdict(response.data.message);
      
    })
    .catch(function (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        console.log("Server responded with error status:", error.response.status);
        console.log("Response data:", error.response.data);
      } else if (error.request) {
        // The request was made but no response was received
        console.log("No response received from server.");
        console.log("Request:", error.request);
      } else {
        // Something happened in setting up the request that triggered an error
        console.log("Error setting up request:", error.message);
      }
      console.log("Error config:", error.config);
    });    
  };

  const handleUploadPhoto = () => {
    if (!photo) {
      Alert.alert('Error', 'Please select an image first.');
      return;
    }

    imageUpload(photo);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Plant Disease Detection</Text>
      <View style={styles.content}>
        {photo && (
          <>
            <Image
              source={{ uri: photo.assets[0].uri }}
              style={styles.image}
            />
            <Button
              title="Upload Photo"
              onPress={handleUploadPhoto}
            />
          </>
        )}
        <View style={styles.buttonContainer}>
          <Button title="Choose Photo" onPress={handleChoosePhoto} />
          {verdict !== '' && <Text style={styles.verdict}>Verdict-{verdict}</Text>}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
    padding:4
  },
  content: {
    alignItems: 'center',
  },
  image: {
    width: 300,
    height: 300,
    marginBottom: 20,
    borderRadius: 10,
    shadowColor: 'black',
    shadowOpacity: 0.5,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 4,
  },
  buttonContainer: {
    marginTop: 20,
  },
  verdict: {
    marginTop: 40,
    fontSize: 25,
    fontWeight:800,
    
    color: 'white',
  },
});

export default ModelPage;