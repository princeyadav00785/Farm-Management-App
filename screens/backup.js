import React, { useState } from 'react';
import { View, Image, Button, Platform, Alert, Text, StyleSheet } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';

const SERVER_URL = 'http://192.168.1.200:5004/receive_string';

const createFormData = (photo, body = {}) => {
  const data = new FormData();

  data.append('photo', {
    
    name: photo.fileName,
    type: photo.type,
    uri: Platform.OS === 'ios' ? photo.uri.replace('file://', '') : photo.uri,
  });

  Object.keys(body).forEach((key) => {
    data.append(key, body[key]);
  });

  return data;
};

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

  console.log(photo);
  const handleUploadPhoto = async () => {
    if (!photo) {
      Alert.alert('Error', 'Please select an image first.');
      return;
    }

    const formData = createFormData(photo);
    try {
      console.log("Inside request..")
      fetch('http://192.168.7.200:8000/api/upload', {
        // fetch("http://localhost:3000/api/upload", {
          method: "POST",
          body: createFormData(photo, { userId: "123" })
        })
          .then(response => response.json())
          .then(response => {
            console.log("upload succes", response);
            alert("Upload success!");
            this.setState({ photo: null });
          })
          .catch(error => {
            console.log("upload error", error);
            alert("Upload failed!");
          });
      
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'Failed to process photo.');
      return error;
    }
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
          {verdict !== '' && <Text style={styles.verdict}>{verdict}</Text>}
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
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
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
    // elevation: 5,
  },
  buttonContainer: {
    marginTop: 20,
  },
  verdict: {
    marginTop: 10,
    fontSize: 16,
    color: 'white',
  },
});

export default ModelPage;
