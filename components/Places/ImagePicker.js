// taking image
// native device features
// npm install expo-image-picker
// needs permissiob to use camera or other thing
// added camera permission in app.json file

import { Image, View, Text, StyleSheet } from "react-native";
import {
  PermissionStatus,
  launchCameraAsync,
  useCameraPermissions,
} from "expo-image-picker";
import { useState } from "react";
import { Colors } from "../../constant/colors";
import OutlinedButton from "../UI/OutlinedButton";

// for Iphone taking request is tough so additonal state for Iphone permission

function ImagePicker({onTakeImage}) {
  const [showClickedImage, setShowClickedImage] = useState();
  const [cameraPermissionInformation, requestPermsion] = useCameraPermissions();

  async function verifyPermission() {
    if (cameraPermissionInformation.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermsion();
      return permissionResponse.granted;
    }

    if (cameraPermissionInformation.status === PermissionStatus.DENIED) {
      Alert.alert(
        "Insufficient Permission",
        "You need to grant camera permissions to use this app"
      );
      return false;
    }
    return true;
  }

  async function takeImageHandler() {
    const hasPermission = await verifyPermission();

    if (!hasPermission) {
      return;
    }
    const image = await launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });
    setShowClickedImage(image.uri);
    onTakeImage(image.uri)
  }

  // Ios has no camera simlulator but bove code will work

  let imagePreview = <Text>No image taken yet</Text>;

  if (showClickedImage) {
    imagePreview = (
      <Image source={{ uri: showClickedImage }} style={styles.image} />
    );
  }

  return (
    <View>
      <View style={styles.imagePreview}>{imagePreview}</View>
      <OutlinedButton icon="camera" onPress={takeImageHandler}>
        Take Image
      </OutlinedButton>
    </View>
  );
}

export default ImagePicker;

const styles = StyleSheet.create({
  imagePreview: {
    width: "100%",
    height: 200,
    marginVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary100,
    borderRadius: 4,
  },

  image: {
    width: "100%",
    height: "100%",
  },
});
