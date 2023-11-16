import OutlinedButton from "../UI/OutlinedButton";
import { useEffect, useState } from "react";
import { View, StyleSheet, Alert, Text, Image } from "react-native";
import { Colors } from "../../constant/colors";
import {
  getCurrentPositionAsync,
  useForegroundPermissions,
  PermissionStatus,
} from "expo-location";
import {getAddress, getMapPreview} from "../../util/location";
import {
  useIsFocused,
  useNavigation,
  useRoute,
} from "@react-navigation/native";

function LocationPIcker({ onPickLocation }) {
  const [pickedLoaction, setPickedLocation] = useState();
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const route = useRoute();
  const [locationPermissionInformation, requestPermission] =
    useForegroundPermissions();

  // fetching the location in Andriod is tricky
  // this code will work on real andriod device
  // amulator is the problem not the actual device

  useEffect(() => {
    if (isFocused && route.params) {
      const mapPickedLocation = {
        lat: route.params.pickedLat,
        lng: route.params.pickedLng,
      };
      setPickedLocation(mapPickedLocation);
    }
  }, [route, isFocused]);







  useEffect(()=>{
    async function handleLocation(){
      if(pickedLoaction){
        const address = await getAddress(pickedLoaction.lat, pickedLoaction.lng)
      onPickLocation({ ...pickedLoaction, address: address })
      }
    }
    handleLocation();
  },[pickedLoaction, onPickLocation])

  
  
  
  
  
  
  
  async function verifyPermission() {
    if (
      locationPermissionInformation.status === PermissionStatus.UNDETERMINED
    ) {
      const permissionResponse = await requestPermission();
      return permissionResponse.granted;
    }
    if (locationPermissionInformation.status === PermissionStatus.DENIED) {
      Alert.alert("Insufficient Permission", "Give required Perimission");
      return false;
    }

    return true;
  }

  async function getLocationHnadler() {
    const hasPermission = await verifyPermission();
    if (!hasPermission) {
      return;
    }

    const location = await getCurrentPositionAsync();
    console.log(location);

    setPickedLocation({
      lat: location.coords.latitude,
      lng: location.coords.longitude,
    })
  }

  function pickonMapHandler() {
    // creating a google Map account adding credit card billing
    // staticapi
    // API key
    // creaitng project using api
    navigation.navigate("Map");
  }

  let locationPreview = <Text> No location picked yet</Text>;
  if (pickedLoaction) {
    locationPreview = (
      <Image
        style={styles.image}
        source={{ uri: getMapPreview(pickedLoaction.lat, pickedLoaction.lng) }}
      />
    );
  }

  return (
    <View>
      <View style={styles.mapPreview}>{locationPreview}</View>
      <View style={styles.actions}>
        <OutlinedButton icon="location" onPress={getLocationHnadler}>
          Locate User
        </OutlinedButton>
        <OutlinedButton icon="map" onPress={pickonMapHandler}>
          {" "}
          Pick on Map
        </OutlinedButton>
      </View>
    </View>
  );
}

export default LocationPIcker;

const styles = StyleSheet.create({
  mapPreview: {
    width: "100%",
    height: 200,
    marginVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary100,
    borderRadius: 4,
    overflow: "hidden",
  },

  actions: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  mapPreviewImage: {
    width: "100%",
    height: "100%",
    borderRadius: 4,
  },
});
