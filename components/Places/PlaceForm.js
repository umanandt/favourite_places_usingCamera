import { useState, useCallback } from "react";
import { ScrollView, Text ,TextInput, View, StyleSheet } from "react-native";
import { Colors } from "../../constant/colors";
import ImagePicker from "./ImagePicker";
import LocationPIcker from "./LocationPicker";
import Button from "../UI/Button";
import { Place } from '../../models/Place'

function PlaceForm({ onCreatePlace}) {
  const [enteredValue, setEnteredValue] = useState();
  const [selectedImage, setSelectedImage] = useState();
  const [pickedLocation, setPickedLocation] = useState();

  function changeTitleHandler(enteredText) {
    setEnteredValue(enteredText);
  }

  function takeImageHandler(imageUri){
    setSelectedImage(imageUri)
  }
  const pickLocationHandler = useCallback((location)=>{
    setPickedLocation(location);
  },[]);
  function savePlaceHandler(){
    const placeData = new Place(enteredValue, selectedImage, pickedLocation)
    onCreatePlace(placeData);
  }

  return (
    <ScrollView style={styles.form}>
      <View>
        <Text style={styles.label}>Title</Text>
        <TextInput
          onChangeText={changeTitleHandler}
          value={enteredValue}
          style={styles.input}
        />
      </View>
      <ImagePicker onTakeImage= {takeImageHandler}/>
      <LocationPIcker onPickLocation={pickLocationHandler}/>
      <Button onPress={savePlaceHandler}>Add Place</Button>
    </ScrollView>
   
  );
}
export default PlaceForm;

const styles = StyleSheet.create({
  form: {
    flex: 1,
    padding: 24,
  },
  label: {
    fontWeight: "bold",
    marginBottom: 4,
    color: Colors.primary500,
  },
  input: {
    marginVertical: 8,
    paddingHorizontal: 4,
    paddingVertical: 8,
    fontSize: 16,
    borderBottomColor: Colors.primary700,
    borderBottomWidth: 2,
    backgroundColor: Colors.primary100,
  },
});
